import Input from './atoms/Input/Input';

function InputComponentExample() {
  return (
    <div className="p-8 space-y-8">
      
      {/* Input Examples */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Input Component Examples</h1>
        
        <div className="space-y-4 max-w-md">
          {/* Basic Input */}
          <Input
            label="Username"
            placeholder="Enter your username"
            hint="Choose a unique username"
          />

          {/* Input with error */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error="Please enter a valid email address"
          />

          {/* Disabled Input */}
          <Input
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
          />

          {/* Different sizes */}
          <div className="space-y-4">
            <Input
              label="Small Input"
              size="sm"
              placeholder="Small size"
            />
            <Input
              label="Medium Input"
              size="md"
              placeholder="Medium size"
            />
            <Input
              label="Large Input"
              size="lg"
              placeholder="Large size"
            />
          </div>

          {/* Different variants */}
          <div className="space-y-4">
            <Input
              label="Default Variant"
              variant="default"
              placeholder="Default style"
            />
            <Input
              label="Filled Variant"
              variant="filled"
              placeholder="Filled style"
            />
          </div>

          {/* Full width input */}
          <Input
            label="Full Width Input"
            placeholder="This input takes full width"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default InputComponentExample;