import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: React.ReactNode;
  /** Modal description */
  description?: React.ReactNode;
  /** Size of the modal */
  size?: ModalSize;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on Escape key */
  closeOnEscapeKey?: boolean;
  /** Whether to show a close button */
  showCloseButton?: boolean;
  /** Whether modal is centered vertically */
  centered?: boolean;
  /** Custom styles for the modal container */
  modalClassName?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full m-4'
};

export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscapeKey = true,
  showCloseButton = true,
  centered = true,
  children,
  className,
  modalClassName,
  ...props
}: ModalProps) {
  // Escape key handler
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscapeKey) {
        onClose();
      }
    },
    [closeOnEscapeKey, onClose]
  );

  // Body scroll lock and escape key listener
  useEffect(() => {
    if (open) {
      // Disable scroll on body
      document.body.style.overflow = 'hidden';

      // Add escape key listener if enabled
      if (closeOnEscapeKey) {
        document.addEventListener('keydown', handleEscapeKey);
      }
    }

    // Cleanup on unmount or when modal closes
    return () => {
      document.body.style.overflow = '';
      if (closeOnEscapeKey) {
        document.removeEventListener('keydown', handleEscapeKey);
      }
    };
  }, [open, closeOnEscapeKey, handleEscapeKey]);

  // Focus trap for tab key
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusable = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusable[0] as HTMLElement;
    const lastFocusable = focusable[focusable.length - 1] as HTMLElement;

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable?.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable?.focus();
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleTabKey);
    }
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [open, handleTabKey]);

  // Don't render if not open
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 transition-opacity"
        aria-hidden="true"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Container */}
      <div
        className={[
          'fixed inset-0 z-50 overflow-y-auto',
          centered && 'flex min-h-full items-center justify-center',
          className
        ].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        {...props}
      >
        <div
          className={[
            'relative w-full transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all',
            'animate-in fade-in zoom-in-95 duration-300',
            !centered && 'my-8 mx-auto',
            sizeStyles[size],
            modalClassName
          ].filter(Boolean).join(' ')}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className={[
                'absolute right-4 top-4 rounded-sm opacity-70 transition-opacity',
                'hover:opacity-100',
                'focus:outline-none focus:ring-2 focus:ring-blue-500'
              ].join(' ')}
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {title && (
            <div className="mb-4">
              <h2 id="modal-title" className="text-lg font-medium">
                {title}
              </h2>
              {description && (
                <p id="modal-description" className="mt-2 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
}

// --------------------
// Optional Helpers
// --------------------

export function ModalHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        'mb-4 text-lg font-medium leading-6',
        className
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        'relative flex-1',
        className
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        'mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4',
        className
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
