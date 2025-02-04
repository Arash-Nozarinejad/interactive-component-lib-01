
import Select from './atoms/Select/Select';
import { useState } from 'react';

function SelectComponentExamples() {

  const [selectedValues, setSelectedValues] = useState({
    basic: '',
    disabled: '',
    error: '',
    required: ''
  });

  const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape', disabled: true }
  ];

  return (
    <div className="">

      {/* Select Examples */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Select Component Examples</h1>
        
        <div className="space-y-4">
          {/* Basic Select */}
          <Select
            label="Basic Select"
            options={fruitOptions}
            value={selectedValues.basic}
            onChange={(value) => setSelectedValues(prev => ({ ...prev, basic: value }))}
            hint="Select your favorite fruit"
          />

          {/* Sizes */}
          <div className="space-y-4">
            <Select
              label="Small Select"
              options={fruitOptions}
              size="sm"
            />
            <Select
              label="Medium Select"
              options={fruitOptions}
              size="md"
            />
            <Select
              label="Large Select"
              options={fruitOptions}
              size="lg"
            />
          </div>

          {/* Disabled */}
          <Select
            label="Disabled Select"
            options={fruitOptions}
            value={selectedValues.disabled}
            onChange={(value) => setSelectedValues(prev => ({ ...prev, disabled: value }))}
            disabled
          />

          {/* With Error */}
          <Select
            label="Select with Error"
            options={fruitOptions}
            value={selectedValues.error}
            onChange={(value) => setSelectedValues(prev => ({ ...prev, error: value }))}
            error="Please select an option"
          />

          {/* Required */}
          <Select
            label="Required Select"
            options={fruitOptions}
            value={selectedValues.required}
            onChange={(value) => setSelectedValues(prev => ({ ...prev, required: value }))}
            required
            hint="You must select an option"
          />

          {/* Full Width */}
          <Select
            label="Full Width Select"
            options={fruitOptions}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default SelectComponentExamples;