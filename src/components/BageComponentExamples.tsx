import Badge from "./atoms/Badge/Badge";

function BageComponentExamples() {
  return (
    <div className="">

      {/* Badge Examples */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Badge Component Examples</h1>
        
        <div className="space-y-4">
          {/* Variants */}
          <div className="space-x-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>

          {/* Sizes */}
          <div className="space-x-2">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>

          {/* Rounded */}
          <div className="space-x-2">
            <Badge rounded>Rounded Default</Badge>
            <Badge variant="primary" rounded>Rounded Primary</Badge>
          </div>

          {/* With Icons */}
          <div className="space-x-2">
            <Badge
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              }
              variant="success"
            >
              Completed
            </Badge>
            <Badge
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              variant="warning"
            >
              Warning
            </Badge>
          </div>

          {/* Dismissible */}
          <div className="space-x-2">
            <Badge
              variant="primary"
              dismissible
              onDismiss={() => alert('Badge dismissed!')}
            >
              Dismissible
            </Badge>
            <Badge
              variant="error"
              dismissible
              rounded
              onDismiss={() => alert('Badge dismissed!')}
            >
              Rounded Dismissible
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BageComponentExamples;