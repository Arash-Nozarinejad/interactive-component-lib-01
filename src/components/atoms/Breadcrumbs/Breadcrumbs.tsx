import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

// ----------------------
// Type Definitions
// ----------------------
export interface BreadcrumbItem {
  /** Label to display */
  label: string;
  /** URL to link to (optional) */
  href?: string;
  /** Icon to display before label (optional) */
  icon?: React.ReactNode;
  /** Whether this item is currently active */
  active?: boolean;
  /** Additional data attributes (optional) */
  [key: string]: any;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator between items */
  separator?: React.ReactNode;
  /** Whether to show a home icon at the start */
  showHomeIcon?: boolean;
  /** Max items to show before collapsing */
  maxItems?: number;
  /** Label for collapsed items dropdown */
  collapsedLabel?: string;
}

// ----------------------
// Breadcrumbs Component
// ----------------------
export function Breadcrumbs({
  items,
  separator = <ChevronRight className="h-4 w-4" />,
  showHomeIcon = false,
  maxItems = 0,
  collapsedLabel = '...',
  className,
  ...props
}: BreadcrumbsProps) {
  // Determine whether to collapse items
  const shouldCollapse = maxItems > 0 && items.length > maxItems;

  // Slice items if collapse is needed: first, a collapse placeholder, then the last two
  const visibleItems = shouldCollapse
    ? [
        items[0],
        { label: collapsedLabel, href: undefined },
        ...items.slice(-2)
      ]
    : items;

  return (
    <nav
      aria-label="Breadcrumb"
      className={['flex w-full', className].filter(Boolean).join(' ')}
      {...props}
    >
      <ol className="flex items-center gap-2">
        {showHomeIcon && (
          <li className="flex items-center">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </a>
            <span className="mx-2 text-gray-400" aria-hidden="true">
              {separator}
            </span>
          </li>
        )}

        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isCollapsed = item.label === collapsedLabel;

          return (
            <li
              key={item.label}
              className="flex items-center"
              {...(isCollapsed && {
                'aria-label': `${items.length - 3} more items`,
              })}
            >
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className={[
                    'flex items-center gap-1 text-sm font-medium',
                    'text-gray-500 hover:text-gray-700',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
                  ].join(' ')}
                >
                  {item.icon && (
                    <span className="text-gray-400">{item.icon}</span>
                  )}
                  {item.label}
                </a>
              ) : (
                <span
                  className={[
                    'flex items-center gap-1 text-sm font-medium',
                    isLast ? 'text-gray-900' : 'text-gray-500',
                    isCollapsed && 'cursor-default px-1'
                  ].filter(Boolean).join(' ')}
                  {...(isLast && { 'aria-current': 'page' })}
                >
                  {item.icon && (
                    <span className="text-gray-400">{item.icon}</span>
                  )}
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Optional Helper Component (not actively used by default)
function BreadcrumbDropdown({
  items,
  onSelect,
}: {
  items: BreadcrumbItem[];
  onSelect: (item: BreadcrumbItem) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      >
        <span className="text-sm font-medium">...</span>
      </button>
      <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1" role="menu">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={[
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
                'focus:bg-gray-100 focus:outline-none'
              ].join(' ')}
              role="menuitem"
              onClick={(e) => {
                if (!item.href) {
                  e.preventDefault();
                  onSelect(item);
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
