import Toggle from "./atoms/Toggle/Toggle";
import { useState } from "react";

function ToggleComponentExamples() {
  const [toggleStates, setToggleStates] = useState({
    notifications: false,
    darkMode: false,
    emailUpdates: false,
    maintenance: false
  });

  return (
    <div className="p-8 space-y-8">
      {/* Keep existing examples */}

      {/* Toggle Examples */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Toggle Component Examples</h1>
        
        <div className="space-y-4">
          {/* Basic Toggle */}
          <Toggle
            label="Enable Notifications"
            checked={toggleStates.notifications}
            onChange={(checked) => setToggleStates(prev => ({ ...prev, notifications: checked }))}
            hint="Receive push notifications for important updates"
          />

          {/* Sizes */}
          <div className="space-y-4">
            <Toggle
              label="Small Toggle"
              size="sm"
              checked={false}
            />
            <Toggle
              label="Medium Toggle"
              size="md"
              checked={false}
            />
            <Toggle
              label="Large Toggle"
              size="lg"
              checked={false}
            />
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <Toggle
              label="Dark Mode"
              variant="primary"
              checked={toggleStates.darkMode}
              onChange={(checked) => setToggleStates(prev => ({ ...prev, darkMode: checked }))}
            />
            <Toggle
              label="Email Updates"
              variant="success"
              checked={toggleStates.emailUpdates}
              onChange={(checked) => setToggleStates(prev => ({ ...prev, emailUpdates: checked }))}
            />
            <Toggle
              label="Maintenance Mode"
              variant="danger"
              checked={toggleStates.maintenance}
              onChange={(checked) => setToggleStates(prev => ({ ...prev, maintenance: checked }))}
            />
          </div>

          {/* Label Position */}
          <div className="space-y-4">
            <Toggle
              label="Label on Right"
              labelPosition="right"
              checked={false}
            />
            <Toggle
              label="Label on Left"
              labelPosition="left"
              checked={false}
            />
          </div>

          {/* States */}
          <div className="space-y-4">
            <Toggle
              label="Disabled Toggle"
              disabled
              checked={false}
            />
            <Toggle
              label="Required Toggle"
              required
              checked={false}
            />
            <Toggle
              label="Toggle with Error"
              error="This field is required"
              checked={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToggleComponentExamples;