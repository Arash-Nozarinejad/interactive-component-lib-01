import React, { TextareaHTMLAttributes, useState, useCallback } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label for the textarea
   */
  label?: string;
  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether to show character count
   */
  showCharCount?: boolean;
  /**
   * Maximum character length
   */
  maxLength?: number;
  /**
   * Whether the textarea should auto-resize based on content
   */
  autoResize?: boolean;
  /**
   * Custom classes to apply to the wrapper
   */
  wrapperClassName?: string;
}

export function Textarea({
  label,
  helperText,
  error,
  showCharCount,
  maxLength,
  autoResize = false,
  className = '',
  wrapperClassName = '',
  required,
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const [currentValue, setCurrentValue] = useState(value || defaultValue || '');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentValue(e.target.value);
      if (onChange) {
        onChange(e);
      }

      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
    },
    [onChange, autoResize]
  );

  const charCount = String(currentValue).length;
  const isError = !!error || (maxLength && charCount > maxLength);

  const id = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const labelClasses = [
    'text-sm font-medium',
    disabled ? 'text-gray-400' : 'text-gray-700',
    isError && 'text-red-600'
  ].filter(Boolean).join(' ');

  const textareaClasses = [
    'w-full min-h-24 rounded-md border px-3 py-2 text-base',
    'placeholder:text-gray-400',
    'focus:outline-none focus:ring-1',
    disabled ? 'cursor-not-allowed bg-gray-50 text-gray-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    isError && 'border-red-300 focus:border-red-500 focus:ring-red-500',
    className
  ].filter(Boolean).join(' ');

  const helperTextClasses = [
    'text-sm',
    error ? 'text-red-600' : 'text-gray-500'
  ].filter(Boolean).join(' ');

  const charCountClasses = [
    'text-sm text-gray-500',
    maxLength && charCount > maxLength && 'text-red-600'
  ].filter(Boolean).join(' ');

  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        {...props}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        aria-invalid={isError ? "true" : "false"}
        aria-describedby={(error || helperText) ? `${id}-description` : undefined}
        className={textareaClasses}
      />

      <div className="flex justify-between">
        {(error || helperText) && (
          <span id={`${id}-description`} className={helperTextClasses}>
            {error || helperText}
          </span>
        )}
        
        {showCharCount && (
          <span className={charCountClasses}>
            {charCount}
            {maxLength && ` / ${maxLength}`}
          </span>
        )}
      </div>
    </div>
  );
}