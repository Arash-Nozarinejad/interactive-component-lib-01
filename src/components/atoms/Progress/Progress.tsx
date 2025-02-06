import React from 'react';

// Define the available sizes and variants.
type ProgressSize = 'sm' | 'md' | 'lg';
type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

export interface ProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Visual style variant */
  variant?: ProgressVariant;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Whether to show the progress value above the bar */
  showValue?: boolean;
  /** Optional function to format the displayed value */
  valueFormat?: (value: number, max: number) => string;
  /** Whether to show an indeterminate (loading) state */
  indeterminate?: boolean;
  /** Whether to show stripes on the progress bar */
  striped?: boolean;
  /** Whether stripes should animate */
  animated?: boolean;
  /** Label for accessibility and display (when showValue is true) */
  label?: string;
}

const variantStyles: Record<ProgressVariant, string> = {
  default: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-500',
  error: 'bg-red-600'
};

const sizeStyles: Record<ProgressSize, string> = {
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-6'
};

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showValue = false,
  valueFormat,
  indeterminate = false,
  striped = false,
  animated = false,
  label,
  className,
  ...props
}: ProgressProps) {
  // Ensure that the value is within [0, max]
  const normalizedValue = Math.min(Math.max(0, value), max);
  const percentage = (normalizedValue / max) * 100;

  // Define a default formatter to show the percentage.
  const defaultValueFormat = (val: number, maximum: number) =>
    `${Math.round((val / maximum) * 100)}%`;

  // Use a custom value format if provided.
  const formattedValue = valueFormat 
    ? valueFormat(normalizedValue, max)
    : defaultValueFormat(normalizedValue, max);

  return (
    <div 
      className="w-full"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : normalizedValue}
      aria-label={label}
      aria-valuetext={indeterminate ? 'Loading...' : formattedValue}
      {...props}
    >
      {showValue && (
        <div className="mb-1 flex justify-between text-sm">
          {label && <span>{label}</span>}
          <span>{formattedValue}</span>
        </div>
      )}
      
      <div
        className={[
          'overflow-hidden rounded-full bg-gray-200',
          sizeStyles[size],
          className
        ].filter(Boolean).join(' ')}
      >
        <div
          className={[
            'h-full transition-all duration-300',
            variantStyles[variant],
            striped && 'bg-stripes',
            animated && striped && 'animate-progress-stripes',
            indeterminate && 'animate-indeterminate-progress w-2/3',
            !indeterminate && 'transition-transform duration-300'
          ].filter(Boolean).join(' ')}
          style={{
            width: indeterminate ? undefined : `${percentage}%`
          }}
        />
      </div>
    </div>
  );
}
