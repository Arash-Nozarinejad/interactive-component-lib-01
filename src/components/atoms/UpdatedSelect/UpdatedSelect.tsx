import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectBaseProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void; // Custom handler
  placeholder?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

interface SelectProps extends Omit<React.ComponentPropsWithoutRef<'select'>, 'value' | 'onChange' | 'size'>, SelectBaseProps {
  ref?: React.Ref<HTMLSelectElement>;
}



const SelectUpdated = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  hint,
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  id,
  required,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;

  // Base styles using template literals for better readability
  const baseSelectStyles = `
    rounded-md
    border
    transition-colors
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    appearance-none
    relative
    pr-10
  `;
  
  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  // State styles
  const stateStyles = {
    default: 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    disabled: 'bg-gray-50 text-gray-500 cursor-not-allowed'
  };

  // Composed styles
  const selectStyles = [
    baseSelectStyles,
    sizeStyles[size],
    error ? stateStyles.error : stateStyles.default,
    disabled ? stateStyles.disabled : '',
    fullWidth ? 'w-full' : 'w-64',
    className
  ].join(' ').trim();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
    setIsOpen(false);
  };

  return (
    <div className={fullWidth ? 'w-full' : 'w-fit'}>
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <select
          {...props}
          id={selectId}
          value={value}
          onChange={handleChange} // Now correctly typed
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={[error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined}
          className={selectStyles}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom arrow icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className={`h-5 w-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

export default SelectUpdated;
