import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  id?: string;
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const Select = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  hint,
  disabled = false,
  required = false,
  size = 'md',
  fullWidth = false,
  className = '',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;

  // Base styles
  const baseSelectStyles = 'relative rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
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

  // Width style
  const widthStyle = fullWidth ? 'w-full' : 'w-64';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(prev => !prev);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < options.filter(opt => !opt.disabled).length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`${fullWidth ? 'w-full' : 'w-fit'}`}>
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <button
          id={selectId}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${selectId}-label`}
          aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
          aria-invalid={!!error}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`
            ${baseSelectStyles}
            ${sizeStyles[size]}
            ${error ? stateStyles.error : stateStyles.default}
            ${disabled ? stateStyles.disabled : ''}
            ${widthStyle}
            ${className}
            flex justify-between items-center
            text-left
          `.trim()}
        >
          <span className={!selectedOption ? 'text-gray-400' : ''}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="ml-2">
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
          </span>
        </button>

        {isOpen && (
          <div 
            className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
            role="listbox"
            aria-labelledby={`${selectId}-label`}
          >
            <ul
              className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  className={`
                    ${value === option.value ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                    ${index === highlightedIndex ? 'bg-blue-50' : ''}
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50'}
                    relative py-2 pl-3 pr-9 select-none
                  `}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange?.(option.value);
                      setIsOpen(false);
                    }
                  }}
                >
                  <span className="block truncate">
                    {option.label}
                  </span>
                  {value === option.value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
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

export default Select;