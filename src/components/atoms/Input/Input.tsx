import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
  label,
  error,
  hint,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  startIcon,
  endIcon,
  disabled = false,
  className = '',
  id,
  ref,
  ...props
}: InputProps) => {
  // Generate a unique ID if none provided
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  // Base styles
  const baseInputStyles = 'rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  // Variant styles
  const variantStyles = {
    default: 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500',
    filled: 'border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-500'
  };

  // State styles
  const stateStyles = {
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    disabled: 'bg-gray-50 text-gray-500 cursor-not-allowed'
  };

  // Width style
  const widthStyle = fullWidth ? 'w-full' : 'w-auto';

  // Icon padding adjustments
  const iconPadding = {
    start: startIcon ? 'pl-10' : '',
    end: endIcon ? 'pr-10' : ''
  };

  return (
    <div className={`${fullWidth ? 'w-full' : 'w-fit'}`}>
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
          className={`
            ${baseInputStyles}
            ${sizeStyles[size]}
            ${variantStyles[variant]}
            ${error ? stateStyles.error : ''}
            ${disabled ? stateStyles.disabled : ''}
            ${widthStyle}
            ${iconPadding.start}
            ${iconPadding.end}
            ${className}
          `.trim()}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p 
          id={errorId}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      {/* Hint text */}
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

export default Input;