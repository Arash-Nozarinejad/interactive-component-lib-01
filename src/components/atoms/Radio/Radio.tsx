interface RadioProps {
  id?: string;
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Radio = ({
  id,
  name,
  value,
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  hint,
  required = false,
  size = 'md',
  className = '',
}: RadioProps) => {
  const radioId = id || `radio-${name}-${value}`.toLowerCase().replace(/\s+/g, '-');
  const errorId = `${radioId}-error`;
  const hintId = `${radioId}-hint`;

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
            type="radio"
            id={radioId}
            name={name}
            value={value}
            checked={checked}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            required={required}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            aria-invalid={!!error}
            className={`
              ${sizeStyles[size]}
              text-blue-600
              bg-white
              border-gray-300
              focus:ring-blue-500
              focus:ring-2
              focus:ring-offset-2
              disabled:opacity-50
              disabled:cursor-not-allowed
              ${error ? 'border-red-500' : ''}
              transition-colors
              duration-200
            `.trim()}
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor={radioId}
            className={`
              ${labelSizeStyles[size]}
              font-medium
              text-gray-900
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${error ? 'text-red-500' : ''}
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

// Radio Group Component
interface RadioGroupProps {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  horizontal?: boolean;
}

const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  required = false,
  size = 'md',
  className = '',
  horizontal = false,
}: RadioGroupProps) => {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      
      <div className={`mt-2 ${horizontal ? 'flex gap-6' : 'space-y-3'}`}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={onChange}
            disabled={option.disabled}
            size={size}
            error={undefined} // Only show error on group level
            hint={undefined} // Only show hint on group level
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Hint text */}
      {hint && !error && (
        <p className="mt-2 text-sm text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
};

// Attach RadioGroup to Radio
Radio.Group = RadioGroup;

export default Radio;