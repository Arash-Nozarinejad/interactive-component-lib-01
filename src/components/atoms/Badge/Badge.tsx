import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
}: BadgeProps) => {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium';

  // Variant styles - background colors and text colors
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-purple-100 text-purple-800'
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  // Icon size styles
  const iconSizeStyles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  // Rounded styles
  const roundedStyles = rounded ? 'rounded-full' : 'rounded-md';

  // Dismissible button styles
  const dismissButtonStyles = {
    sm: '-mr-0.5 ml-1.5',
    md: '-mr-1 ml-2',
    lg: '-mr-1 ml-2.5'
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${roundedStyles}
        ${className}
      `.trim()}
    >
      {icon && (
        <span className={`${iconSizeStyles[size]} mr-1.5`}>
          {icon}
        </span>
      )}
      {children}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className={`
            ${dismissButtonStyles[size]}
            hover:bg-opacity-20
            hover:bg-black
            rounded-full
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-${variant === 'default' ? 'gray' : variant}-100
            focus:ring-${variant === 'default' ? 'gray' : variant}-400
          `.trim()}
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className={iconSizeStyles[size]}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;