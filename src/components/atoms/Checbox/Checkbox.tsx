import React from 'react';

interface CheckboxProps {
  id?: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Checkbox = ({
  id,
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  hint,
  required = false,
  indeterminate = false,
  size = 'md',
  className = '',
}: CheckboxProps) => {
  const checkboxId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${checkboxId}-error`;
  const hintId = `${checkboxId}-hint`;

  // Handle checkbox ref for indeterminate state
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Size styles
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Label size styles
  const labelSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={checkboxRef}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            disabled={disabled}
            required={required}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            aria-invalid={!!error}
            className={`
              ${sizeStyles[size]}
              form-checkbox
              rounded
              border-gray-300
              text-blue-600
              transition
              duration-150
              ease-in-out
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              ${error ? 'border-red-500' : ''}
            `.trim()}
          />
        </div>
        <div className="ml-3 text-gray-700">
          <label
            htmlFor={checkboxId}
            className={`
              ${labelSizeStyles[size]}
              ${disabled ? 'opacity-50' : ''}
              ${error ? 'text-red-500' : ''}
              cursor-pointer
              select-none
            `.trim()}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          
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
      </div>
    </div>
  );
};

export default Checkbox;