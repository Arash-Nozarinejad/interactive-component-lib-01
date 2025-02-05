import React from 'react';

interface ToggleBaseProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'danger';
  labelPosition?: 'left' | 'right';
  error?: string;
  hint?: string;
}

interface ToggleProps extends ToggleBaseProps, Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'onChange'> {
  ref?: React.Ref<HTMLInputElement>;
}

const Toggle = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  hint,
  required = false,
  size = 'md',
  variant = 'primary',
  labelPosition = 'right',
  className = '',
  id,
  ...props
}: ToggleProps) => {
  const toggleId = id || `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${toggleId}-error`;
  const hintId = `${toggleId}-hint`;

  // Size configurations
  const sizes = {
    sm: {
      toggle: 'w-8 h-4',
      circle: 'h-3 w-3',
      translateX: 'translate-x-4',
      text: 'text-sm'
    },
    md: {
      toggle: 'w-11 h-6',
      circle: 'h-5 w-5',
      translateX: 'translate-x-5',
      text: 'text-base'
    },
    lg: {
      toggle: 'w-14 h-8',
      circle: 'h-7 w-7',
      translateX: 'translate-x-6',
      text: 'text-lg'
    }
  };

  // Variant styles
  const variants = {
    primary: {
      active: 'bg-blue-600',
      focus: 'focus:ring-blue-500'
    },
    success: {
      active: 'bg-green-600',
      focus: 'focus:ring-green-500'
    },
    danger: {
      active: 'bg-red-600',
      focus: 'focus:ring-red-500'
    }
  };

  // Composed styles using template literals
  const toggleWrapperStyles = `
    relative
    inline-flex
    h-fit
    flex-shrink-0
    cursor-pointer
    rounded-full
    border-2
    border-transparent
    transition-colors
    ease-in-out
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    ${variants[variant].focus}
    ${checked ? variants[variant].active : 'bg-gray-200'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${sizes[size].toggle}
  `;

  const circleStyles = `
    pointer-events-none
    inline-block
    rounded-full
    bg-white
    shadow
    transform
    ring-0
    transition-transform
    ease-in-out
    duration-200
    ${sizes[size].circle}
    ${checked ? sizes[size].translateX : 'translate-x-0'}
  `;

  const labelStyles = `
    ${sizes[size].text}
    font-medium
    text-gray-900
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    select-none
    ${labelPosition === 'left' ? 'mr-3' : 'ml-3'}
  `;

  return (
    <div className={className}>
      <div className={`flex items-center ${labelPosition === 'left' ? 'flex-row-reverse justify-end' : 'flex-row'}`}>
        <input
          {...props}
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          required={required}
          className="sr-only"
          aria-describedby={[
            error && errorId,
            hint && hintId
          ].filter(Boolean).join(' ') || undefined}
        />
        
        <label 
          htmlFor={toggleId}
          className={toggleWrapperStyles}
        >
          <span className="sr-only">
            {label}
          </span>
          <span
            aria-hidden="true"
            className={circleStyles}
          />
        </label>

        <label
          htmlFor={toggleId}
          className={labelStyles}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>

      {error && (
        <p
          id={errorId}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      {hint && !error && (
        <p
          id={hintId}
          className="mt-1 text-sm text-gray-500"
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Toggle;