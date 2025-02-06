// src/components/AlertExample.tsx
import { useState } from 'react';
import { Alert } from './atoms/Alert/Alert';
import { ToastProvider, useToast } from './ToastContext';
import { ToastContainer } from './ToastContainer';

function AlertExamples() {
  const { addToast } = useToast();
  const [activeExample, setActiveExample] = useState<string | null>(null);

  // Render a static alert based on which button was pressed
  const renderAlertExample = () => {
    switch (activeExample) {
      case 'info':
        return (
          <Alert title="Information" variant="info">
            This is an informative alert.
          </Alert>
        );
      case 'success':
        return (
          <Alert title="Success!" variant="success">
            Your changes have been saved successfully.
          </Alert>
        );
      case 'warning':
        return (
          <Alert title="Warning" variant="warning" dismissible>
            Your session will expire soon.
          </Alert>
        );
      case 'error':
        return (
          <Alert title="Error" variant="error" dismissible>
            Failed to save changes. Please try again.
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Buttons to show static Alert examples */}
      <div className="space-x-2">
        <button
          onClick={() => setActiveExample('info')}
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Show Info Alert
        </button>
        <button
          onClick={() => setActiveExample('success')}
          className="rounded-md bg-green-600 px-4 py-2 text-white"
        >
          Show Success Alert
        </button>
        <button
          onClick={() => setActiveExample('warning')}
          className="rounded-md bg-yellow-600 px-4 py-2 text-white"
        >
          Show Warning Alert
        </button>
        <button
          onClick={() => setActiveExample('error')}
          className="rounded-md bg-red-600 px-4 py-2 text-white"
        >
          Show Error Alert
        </button>
      </div>

      {/* Display the selected alert example */}
      <div>{renderAlertExample()}</div>

      {/* Buttons for Toast examples */}
      <div className="space-x-2">
        <button
          onClick={() =>
            addToast({
              title: 'Success',
              message: 'Operation completed successfully',
              variant: 'success',
              duration: 5000
            })
          }
          className="rounded-md bg-green-600 px-4 py-2 text-white"
        >
          Show Success Toast
        </button>
        <button
          onClick={() =>
            addToast({
              title: 'Error',
              message: 'Something went wrong',
              variant: 'error',
              duration: 5000
            })
          }
          className="rounded-md bg-red-600 px-4 py-2 text-white"
        >
          Show Error Toast
        </button>
      </div>

      {/* Container to render active Toasts */}
      <ToastContainer />
    </div>
  );
}

// Wrap the examples with the ToastProvider so that the toast context is available
export function AlertExampleWithProvider() {
  return (
    <ToastProvider>
      <AlertExamples />
    </ToastProvider>
  );
}
