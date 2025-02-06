import React, { createContext, useContext, useEffect, useCallback } from 'react';

// --------------------
// Types & Context
// --------------------

type TabsVariant = 'line' | 'enclosed' | 'pills';
type TabsAlign = 'start' | 'center' | 'end';
type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
  register: (id: string) => void;
  unregister: (id: string) => void;
  getItemProps: (id: string) => {
    role: 'tab';
    'aria-selected': boolean;
    'aria-controls': string;
    id: string;
    isSelected: boolean;
  };
  getPanelProps: (id: string) => {
    role: 'tabpanel';
    'aria-labelledby': string;
    id: string;
  };
}

const TabsContext = createContext<TabsContextValue | null>(null);

// --------------------
// Props Interfaces
// --------------------

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Default selected tab id */
  defaultValue?: string;
  /** Selected tab id (controlled) */
  value?: string;
  /** Callback when selected tab changes */
  onChange?: (value: string) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Alignment of tabs */
  align?: TabsAlign;
  /** Orientation of tabs */
  orientation?: TabsOrientation;
  /** Whether tabs take full width */
  fullWidth?: boolean;
  /** Whether to automatically activate tab on focus */
  activateOnFocus?: boolean;
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique identifier for the tab */
  value: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value matching the associated tab */
  value: string;
}

// --------------------
// Root Tabs Component
// --------------------

export function Tabs({
  defaultValue,
  value: controlledValue,
  onChange,
  variant = 'line',
  align = 'start',
  orientation = 'horizontal',
  fullWidth = false,
  activateOnFocus = true,
  className,
  children,
  ...props
}: TabsProps) {
  const [selectedTab, setSelectedTabState] = React.useState(defaultValue ?? '');
  const [items, setItems] = React.useState<string[]>([]);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : selectedTab;

  const setSelectedTab = useCallback((newValue: string) => {
    if (!isControlled) {
      setSelectedTabState(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);

  const register = useCallback((id: string) => {
    setItems(prev => [...prev, id]);
  }, []);

  const unregister = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item !== id));
  }, []);

  const getItemProps = useCallback((id: string) => ({
    role: 'tab' as const,
    'aria-selected': value === id,
    'aria-controls': `panel-${id}`,
    id: `tab-${id}`,
    isSelected: value === id,
  }), [value]);

  const getPanelProps = useCallback((id: string) => ({
    role: 'tabpanel' as const,
    'aria-labelledby': `tab-${id}`,
    id: `panel-${id}`,
  }), []);

  // Set initial value if none provided
  useEffect(() => {
    if (!value && items.length > 0) {
      setSelectedTab(items[0]);
    }
  }, [value, items, setSelectedTab]);

  const context = {
    selectedTab: value,
    setSelectedTab,
    variant,
    orientation,
    register,
    unregister,
    getItemProps,
    getPanelProps,
  };

  return (
    <TabsContext.Provider value={context}>
      <div
        className={[
          'w-full',
          orientation === 'vertical' && 'flex gap-4',
          className
        ].filter(Boolean).join(' ')}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// --------------------
// TabList Component
// --------------------

export function TabList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabList must be used within Tabs');

  const { orientation, variant } = context;

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={[
        'flex',
        orientation === 'vertical' && 'flex-col',
        variant === 'enclosed' && 'rounded-t-lg border-b bg-gray-50',
        variant === 'line' && 'border-b border-gray-200',
        className
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

// --------------------
// Tab Component
// --------------------

export function Tab({
  value,
  disabled = false,
  className,
  children,
  ...props
}: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const {
    setSelectedTab,
    variant,
    register,
    unregister,
    getItemProps,
  } = context;

  React.useEffect(() => {
    register(value);
    return () => unregister(value);
  }, [register, unregister, value]);

  const itemProps = getItemProps(value);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setSelectedTab(value)}
      className={[
        'flex items-center justify-center px-4 py-2 text-sm font-medium outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        variant === 'line' && [
          'border-b-2',
          itemProps.isSelected
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700'
        ],
        variant === 'enclosed' && [
          'rounded-t-lg border-b',
          itemProps.isSelected
            ? 'border-x border-t border-b-white bg-white'
            : 'border-transparent hover:bg-gray-100'
        ],
        variant === 'pills' && [
          'rounded-md',
          itemProps.isSelected
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
        ],
        disabled && 'cursor-not-allowed opacity-50',
        className
      ].flat().filter(Boolean).join(' ')}
      {...itemProps}
      {...props}
    >
      {children}
    </button>
  );
}

// --------------------
// TabPanel Component
// --------------------

export function TabPanel({
  value,
  className,
  children,
  ...props
}: TabPanelProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { selectedTab, getPanelProps } = context;
  const panelProps = getPanelProps(value);

  if (value !== selectedTab) {
    return null;
  }

  return (
    <div
      className={[
        'animate-in fade-in duration-200 ease-in-out',
        className
      ].filter(Boolean).join(' ')}
      {...panelProps}
      {...props}
    >
      {children}
    </div>
  );
}
