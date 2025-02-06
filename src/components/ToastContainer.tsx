// src/components/ToastContainer.tsx
import { useToast } from './ToastContext';
import { Alert } from './atoms/Alert/Alert';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="animate-slide-in-right">
          <Alert
            variant={toast.variant}
            title={toast.title}
            dismissible
            onDismiss={() => removeToast(toast.id)}
          >
            {toast.message}
          </Alert>
        </div>
      ))}
    </div>
  );
}
