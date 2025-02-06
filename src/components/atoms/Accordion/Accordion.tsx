import React, { createContext, useContext, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

// --------------------
// Types & Context
// --------------------

type AccordionType = 'single' | 'multiple';
type AccordionVariant = 'default' | 'bordered' | 'separated';

interface AccordionContextValue {
  type: AccordionType;
  value: string | string[];
  onChange: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

// --------------------
// Props Interfaces
// --------------------

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Type of accordion behavior: 'single' or 'multiple' */
  type?: AccordionType;
  /** Currently expanded item(s) */
  value?: string | string[];
  /** Default expanded item(s) */
  defaultValue?: string | string[];
  /** Callback when expanded items change */
  onValueChange?: (value: string | string[]) => void;
  /** Whether to allow collapsing all items */
  collapsible?: boolean;
  /** Whether to animate transitions */
  animated?: boolean;
  /** Visual variant */
  variant?: AccordionVariant;
}

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for the item */
  value: string;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional custom icon (defaults to a chevron) */
  icon?: React.ReactNode;
}

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// --------------------
// Accordion Root
// --------------------

export function Accordion({
  type = 'single',
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = true,
  animated = true, // Currently not used in this snippet but kept for potential use
  variant = 'default',
  className,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    controlledValue ??
      defaultValue ??
      (type === 'multiple' ? [] : '')
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  /** When an item is toggled, decide the next value. */
  const handleChange = (itemValue: string) => {
    if (type === 'single') {
      const sameItemClicked = currentValue === itemValue;
      const newValue = sameItemClicked && collapsible ? '' : itemValue;
      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue);
    } else {
      // multiple
      const arrayValue = Array.isArray(currentValue) ? currentValue : [];
      const isItemOpen = arrayValue.includes(itemValue);
      let newValue;
      if (isItemOpen) {
        newValue = arrayValue.filter((v) => v !== itemValue);
      } else {
        newValue = [...arrayValue, itemValue];
      }
      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue);
    }
  };

  return (
    <AccordionContext.Provider
      value={{
        type,
        value: currentValue,
        onChange: handleChange
      }}
    >
      <div
        className={[
          'divide-y divide-gray-200',
          variant === 'bordered' && 'rounded-md border border-gray-200',
          variant === 'separated' && 'space-y-2',
          className
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// --------------------
// AccordionItem
// --------------------

export function AccordionItem({
  value,
  disabled = false,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const { value: accordionValue } = context;

  // Determine if item is expanded
  const isExpanded = Array.isArray(accordionValue)
    ? accordionValue.includes(value)
    : accordionValue === value;

  // Provide item context for trigger and content
  const itemContextValue: AccordionItemContextValue = {
    value,
    disabled
  };

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <div
        className={[
          'overflow-hidden',
          disabled && 'cursor-not-allowed opacity-50',
          className
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// --------------------
// AccordionTrigger
// --------------------

export function AccordionTrigger({
  className,
  children,
  icon = (
    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
  ),
  ...props
}: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);
  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  const { value: accordionValue, onChange } = accordionContext;
  const { value: itemValue, disabled } = itemContext;

  const isExpanded = Array.isArray(accordionValue)
    ? accordionValue.includes(itemValue)
    : accordionValue === itemValue;

  const handleClick = () => {
    if (!disabled) {
      onChange(itemValue);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-expanded={isExpanded}
      className={[
        'flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium transition-all',
        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        disabled && 'cursor-not-allowed',
        className
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
      <span
        className={[
          'ml-2 transform transition-transform duration-200',
          isExpanded && 'rotate-180'
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {icon}
      </span>
    </button>
  );
}

// --------------------
// AccordionContent
// --------------------

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  const { value: accordionValue } = accordionContext;
  const { value: itemValue } = itemContext;

  const isExpanded = Array.isArray(accordionValue)
    ? accordionValue.includes(itemValue)
    : accordionValue === itemValue;

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={contentRef}
      className={[
        'overflow-hidden transition-all duration-200',
        !isExpanded && 'h-0',
        className
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        height: isExpanded ? contentRef.current?.scrollHeight : 0
      }}
      {...props}
    >
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}
