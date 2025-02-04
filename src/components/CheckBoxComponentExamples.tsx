import Checkbox from './atoms/Checbox/Checkbox';
import { useState } from 'react';

function CheckboxComponentExamples() {
  const [checkboxStates, setCheckboxStates] = useState({
    basic: false,
    indeterminate: false,
    disabled: false,
    error: false,
    required: false
  });

  return (
    <div className="">

      {/* Checkbox Examples */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Checkbox Component Examples</h1>
        
        <div className="space-y-4">
          {/* Basic Checkbox */}
          <Checkbox
            label="Basic Checkbox"
            checked={checkboxStates.basic}
            onChange={(checked) => setCheckboxStates(prev => ({ ...prev, basic: checked }))}
            hint="This is a basic checkbox example"
          />

          {/* Sizes */}
          <div className="space-y-2">
            <Checkbox
              label="Small Checkbox"
              size="sm"
              checked={false}
            />
            <Checkbox
              label="Medium Checkbox"
              size="md"
              checked={false}
            />
            <Checkbox
              label="Large Checkbox"
              size="lg"
              checked={false}
            />
          </div>

          {/* Indeterminate */}
          <Checkbox
            label="Indeterminate Checkbox"
            checked={checkboxStates.indeterminate}
            onChange={(checked) => setCheckboxStates(prev => ({ ...prev, indeterminate: checked }))}
            indeterminate={true}
          />

          {/* Disabled */}
          <Checkbox
            label="Disabled Checkbox"
            checked={checkboxStates.disabled}
            onChange={(checked) => setCheckboxStates(prev => ({ ...prev, disabled: checked }))}
            disabled
          />

          {/* With Error */}
          <Checkbox
            label="Checkbox with Error"
            checked={checkboxStates.error}
            onChange={(checked) => setCheckboxStates(prev => ({ ...prev, error: checked }))}
            error="This field is required"
          />

          {/* Required */}
          <Checkbox
            label="Required Checkbox"
            checked={checkboxStates.required}
            onChange={(checked) => setCheckboxStates(prev => ({ ...prev, required: checked }))}
            required
            hint="This checkbox must be checked"
          />
        </div>
      </div>
    </div>
  );
}

export default CheckboxComponentExamples;