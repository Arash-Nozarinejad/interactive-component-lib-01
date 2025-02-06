import React, { AnchorHTMLAttributes } from 'react';

type Variant = 'default' | 'button' | 'subtle' | 'underline';
type Size = 'sm' | 'md' | 'lg';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Visual variant of the link
   */
  variant?: Variant;
  /**
   * Size of the link
   */
  size?: Size;
  /**
   * Whether the link is external (opens in new tab)
   */
  external?: boolean;
  /**
   * Whether to show an icon for external links
   */
  showExternalIcon?: boolean;
  /**
   * Whether the link is disabled
   */
  disabled?: boolean;
  /**
   * Whether the link is disabled
   */
  ref?: string;
}

const variantStyles: Record<Variant, string> = {
  default: 'text-blue-600 hover:text-blue-700 focus:text-blue-700',
  button: 'inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  subtle: 'text-gray-600 hover:text-gray-900',
  underline: 'text-blue-600 hover:text-blue-700 underline underline-offset-4'
};

const sizeStyles: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
};

export function Link({
  children,
  className,
  variant = 'default',
  size = 'md',
  external = false,
  showExternalIcon = true,
  disabled = false,
  ref,
  ...props
}: LinkProps) {
  const externalProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': `${props['aria-label'] || children} (opens in new tab)`
  } : {};

  const disabledProps = disabled ? {
    'aria-disabled': true,
    tabIndex: -1,
    onClick: (e: React.MouseEvent) => e.preventDefault()
  } : {};

  return (
    <a
      {...props}
      {...externalProps}
      {...disabledProps}
      ref={ref}
      className={[
        'inline-flex items-center gap-1 rounded-sm outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-blue-500',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'cursor-not-allowed opacity-50',
        className
      ].filter(Boolean).join(' ')}
    >
      {children}
      {external && showExternalIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </a>
  );
}
