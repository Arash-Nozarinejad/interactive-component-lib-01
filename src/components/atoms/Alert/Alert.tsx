// src/components/atoms/Alert/Alert.tsx
import React from 'react';
import { X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the alert
   */
  variant?: AlertVariant;
  /**
   * The title of the alert
   */
  title?: string;
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;
  /**
   * Duration in ms before auto-dismissing (0 for no auto-dismiss)
   */
  duration?: number;
}

const variants: Record<AlertVariant, { icon: JSX.Element; classes: string }> = {
  info: {
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    classes: 'bg-blue-50 text-blue-800 border-blue-200'
  },
  success: {
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    classes: 'bg-green-50 text-green-800 border-green-200'
  },
  warning: {
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    classes: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  },
  error: {
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    classes: 'bg-red-50 text-red-800 border-red-200'
  }
};

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
  role = 'alert',
  ...props
}: AlertProps) {
  const variantConfig = variants[variant];

  return (
    <div
      role={role}
      className={[
        'relative flex gap-3 rounded-lg border p-4',
        variantConfig.classes,
        className
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="flex-shrink-0">{variantConfig.icon}</div>
      <div className="flex-1">
        {title && <h3 className="mb-1 font-medium">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className={[
            'absolute right-2 top-2 rounded-lg p-1.5',
            'hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset'
          ].filter(Boolean).join(' ')}
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
