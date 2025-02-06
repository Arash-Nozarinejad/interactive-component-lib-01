import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef
  } from 'react';
  import { ChevronRight } from 'lucide-react';
  
  /* ------------------------------------------------------------------
   * Types & Interfaces
   * -----------------------------------------------------------------*/
  
  export interface MenuProps {
    /** The trigger element (e.g., a button) that opens the menu */
    trigger: React.ReactNode;
    /** The menu items and submenus to display */
    children: React.ReactNode;
    /** Alignment of the menu relative to the trigger */
    align?: 'start' | 'center' | 'end';
    /** Additional CSS classes for the menu container */
    className?: string;
  }
  
  export interface MenuItemProps {
    /** The content of the menu item */
    children: React.ReactNode;
    /** Optional click handler */
    onClick?: () => void;
    /** Whether the menu item is disabled */
    disabled?: boolean;
    /** An optional icon to place before the item text */
    icon?: React.ReactNode;
    /** A shortcut or hotkey text to display on the right */
    shortcut?: string;
    /** Additional CSS classes for the menu item */
    className?: string;
    /** (Internal) Index used for keyboard navigation */
    itemIndex?: number;
  }
  
  export interface MenuSeparatorProps {
    /** Additional CSS classes for the separator */
    className?: string;
  }
  
  export interface MenuGroupProps {
    /** Label for the group */
    label: string;
    /** Grouped menu items */
    children: React.ReactNode;
    /** Additional CSS classes for the group */
    className?: string;
  }
  
  /* ------------------------------------------------------------------
   * Context
   * -----------------------------------------------------------------*/
  
  interface MenuContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    activeItemIndex: number;
    setActiveItemIndex: (index: number) => void;
  }
  
  const MenuContext = createContext<MenuContextType | null>(null);
  
  function useMenu() {
    const context = useContext(MenuContext);
    if (!context) {
      throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
  }
  
  /* ------------------------------------------------------------------
   * Type Guard for MenuItem
   * -----------------------------------------------------------------*/
  
  /**
   * A specialized type for a React element that has `MenuItemProps`
   * and a `type.displayName` of `'MenuItem'`.
   */
  type MenuItemElement = React.ReactElement<MenuItemProps> & {
    type: { displayName?: string };
  };
  
  /** Check if a node is a valid `MenuItem` element. */
  function isMenuItemElement(child: React.ReactNode): child is MenuItemElement {
    return (
      React.isValidElement(child) &&
      (child.type as any).displayName === 'MenuItem'
    );
  }
  
  /* ------------------------------------------------------------------
   * Root Menu Component
   * -----------------------------------------------------------------*/
  
  export function Menu({
    trigger,
    children,
    align = 'start',
    className = ''
  }: MenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(-1);
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
    const menuRef = useRef<HTMLDivElement>(null);
  
    // Close menu when clicking outside
    useEffect(() => {
      if (!isOpen) return;
  
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);
  
    // Filter for only MenuItem elements to handle arrow key navigation
    const menuItems = React.Children.toArray(children).filter(isMenuItemElement);
  
    // Calculate max height based on viewport
    useEffect(() => {
      if (!isOpen) return;
      const rect = menuRef.current?.getBoundingClientRect();
      if (rect) {
        const spaceBelow = window.innerHeight - rect.top;
        setMaxHeight(Math.min(spaceBelow - 20, 300));
      }
    }, [isOpen]);
  
    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (!isOpen) return;
  
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setActiveItemIndex(prev =>
              prev < menuItems.length - 1 ? prev + 1 : 0
            );
            break;
          case 'ArrowUp':
            e.preventDefault();
            setActiveItemIndex(prev =>
              prev > 0 ? prev - 1 : menuItems.length - 1
            );
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (activeItemIndex >= 0 && activeItemIndex < menuItems.length) {
              const activeItem = menuItems[activeItemIndex];
              // activeItem is a MenuItemElement (thanks to type guard),
              // so `onClick` is valid.
              activeItem.props.onClick?.();
            }
            setIsOpen(false);
            break;
          case 'Escape':
            setIsOpen(false);
            break;
        }
      },
      [isOpen, menuItems, activeItemIndex]
    );
  
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
  
    return (
      <MenuContext.Provider
        value={{ isOpen, setIsOpen, activeItemIndex, setActiveItemIndex }}
      >
        <div
          className={['relative inline-block', className].filter(Boolean).join(' ')}
        >
          {/* Trigger */}
          <div
            onClick={() => {
              setIsOpen(prev => !prev);
              // Reset active index each time menu opens
              setActiveItemIndex(-1);
            }}
            className="cursor-pointer"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            {trigger}
          </div>
  
          {/* Dropdown menu */}
          {isOpen && (
            <div
              ref={menuRef}
              className={[
                'absolute z-50 mt-2 w-56 rounded-md bg-white',
                'shadow-lg ring-1 ring-black ring-opacity-5',
                align === 'center' && 'left-1/2 -translate-x-1/2',
                align === 'end' && 'right-0',
                align === 'start' && 'left-0'
              ]
                .filter(Boolean)
                .join(' ')}
              role="menu"
              aria-orientation="vertical"
              style={{ maxHeight, overflowY: 'auto' }}
            >
              <div className="py-1">
                {React.Children.map(children, (child, i) => {
                  // If it's a MenuItem, clone with itemIndex
                  if (isMenuItemElement(child)) {
                    return React.cloneElement(child, { itemIndex: i });
                  }
                  // If it's something else (MenuGroup, SubMenu, Separator), return as-is
                  return child;
                })}
              </div>
            </div>
          )}
        </div>
      </MenuContext.Provider>
    );
  }
  
  /* ------------------------------------------------------------------
   * MenuItem
   * -----------------------------------------------------------------*/
  export function MenuItem({
    children,
    onClick,
    disabled = false,
    icon,
    shortcut,
    className = '',
    itemIndex
  }: MenuItemProps) {
    const { activeItemIndex, setActiveItemIndex } = useMenu();
  
    return (
      <div
        role="menuitem"
        className={[
          'group flex items-center px-4 py-2 text-sm',
          disabled
            ? 'cursor-not-allowed text-gray-400'
            : 'cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900',
          // Highlight if active
          activeItemIndex === itemIndex && 'bg-gray-100',
          className
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => !disabled && onClick?.()}
        onMouseEnter={() =>
          typeof itemIndex === 'number' && setActiveItemIndex(itemIndex)
        }
        tabIndex={disabled ? -1 : 0}
      >
        {icon && (
          <span className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
            {icon}
          </span>
        )}
        <span className="flex-grow">{children}</span>
        {shortcut && (
          <span className="ml-3 text-xs text-gray-400 group-hover:text-gray-500">
            {shortcut}
          </span>
        )}
      </div>
    );
  }
  // Assign displayName for the type guard
  MenuItem.displayName = 'MenuItem';
  
  /* ------------------------------------------------------------------
   * MenuSeparator
   * -----------------------------------------------------------------*/
  export function MenuSeparator({ className = '' }: MenuSeparatorProps) {
    return (
      <div
        role="separator"
        className={['my-1 h-px bg-gray-200', className].filter(Boolean).join(' ')}
      />
    );
  }
  
  /* ------------------------------------------------------------------
   * MenuGroup
   * -----------------------------------------------------------------*/
  export function MenuGroup({
    label,
    children,
    className = ''
  }: MenuGroupProps) {
    return (
      <div role="group" aria-label={label} className={className}>
        <div className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </div>
        {children}
      </div>
    );
  }
  
  /* ------------------------------------------------------------------
   * SubMenu
   * -----------------------------------------------------------------*/
  export function SubMenu({
    trigger,
    children,
    align = 'end',
    className = ''
  }: MenuProps) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div
        className={['relative', className].filter(Boolean).join(' ')}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div
          role="menuitem"
          className={[
            'flex items-center px-4 py-2 text-sm text-gray-700',
            'cursor-pointer hover:bg-gray-100 hover:text-gray-900'
          ].join(' ')}
        >
          {trigger}
          <ChevronRight className="ml-auto h-4 w-4" />
        </div>
        {isOpen && (
          <div
            className={[
              'absolute left-full top-0 w-56 rounded-md bg-white',
              'shadow-lg ring-1 ring-black ring-opacity-5'
            ].join(' ')}
            role="menu"
          >
            <div className="py-1">{children}</div>
          </div>
        )}
      </div>
    );
  }
  // Assign displayName if you'd like to check for 'SubMenu' specifically
  SubMenu.displayName = 'SubMenu';
  