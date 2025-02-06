import React from 'react';

// Define possible sizes and variants for the spinner.
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'success' | 'error';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Visual style variant */
  variant?: SpinnerVariant;
  /** Whether to show the loading text */
  showText?: boolean;
  /** Custom loading text */
  text?: string;
  /** Position of the text relative to the spinner */
  textPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Whether the spinner is centered in its container */
  centered?: boolean;
  /** Delay (in ms) before showing the spinner */
  delayMs?: number;
}

// Define Tailwind CSS classes for each size.
const sizeStyles: Record<SpinnerSize, { spinner: string; text: string }> = {
  xs: { spinner: 'h-3 w-3', text: 'text-xs' },
  sm: { spinner: 'h-4 w-4', text: 'text-sm' },
  md: { spinner: 'h-6 w-6', text: 'text-base' },
  lg: { spinner: 'h-8 w-8', text: 'text-lg' },
  xl: { spinner: 'h-12 w-12', text: 'text-xl' }
};

// Define color variants.
const variantStyles: Record<SpinnerVariant, string> = {
  default: 'text-gray-600',
  primary: 'text-blue-600',
  secondary: 'text-purple-600',
  success: 'text-green-600',
  error: 'text-red-600'
};

// Define layout classes for text positioning.
const textPositionStyles = {
  left: 'flex-row-reverse gap-2',
  right: 'flex-row gap-2',
  top: 'flex-col-reverse gap-1',
  bottom: 'flex-col gap-1'
};

export function Spinner({
  size = 'md',
  variant = 'primary',
  showText = false,
  text = 'Loading...',
  textPosition = 'right',
  centered = false,
  delayMs = 0,
  className,
  ...props
}: SpinnerProps) {
  // Manage spinner visibility; if delayMs is provided, wait that many milliseconds before showing.
  const [show, setShow] = React.useState(!delayMs);

  React.useEffect(() => {
    if (delayMs) {
      const timer = setTimeout(() => setShow(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);

  // If not ready to show, return null.
  if (!show) {
    return null;
  }

  // A local wrapper applies layout and positioning classes.
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      {...props}
      className={[
        'inline-flex items-center',
        textPositionStyles[textPosition],
        centered && 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        className
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );

  return (
    <Wrapper>
      {/* The spinner icon using an SVG with a rotating animation */}
      <div
        className={[
          'animate-spin',
          sizeStyles[size].spinner,
          variantStyles[variant]
        ].filter(Boolean).join(' ')}
        role="status"
        aria-label={text}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      {/* Optionally show loading text */}
      {showText && (
        <span
          className={[
            'select-none',
            sizeStyles[size].text,
            variantStyles[variant]
        ].filter(Boolean).join(' ')}
          aria-hidden="true"
        >
          {text}
        </span>
      )}
    </Wrapper>
  );
}

// Alternative style: DotsSpinner renders three pulsing dots.
export function DotsSpinner({
  size = 'md',
  variant = 'primary',
  className,
  ...props
}: Omit<SpinnerProps, 'showText' | 'text' | 'textPosition'>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={['flex gap-1', className].filter(Boolean).join(' ')}
      {...props}
    >
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className={[
            'animate-pulse rounded-full',
            sizeStyles[size].spinner,
            variantStyles[variant]
            ].filter(Boolean).join(' ')}
          style={{
            animationDelay: `${dot * 0.15}s`
          }}
        />
      ))}
    </div>
  );
}
