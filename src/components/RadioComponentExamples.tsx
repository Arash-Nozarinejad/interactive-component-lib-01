import Radio from './atoms/Radio/Radio';
import { useState } from 'react';

function RadioComponentExamples() {
  const [radioValues, setRadioValues] = useState({
    fruits: '',
    size: '',
    contact: '',
    programming: ''
  });

  return (
    <div className="p-8 space-y-8">
      {/* Keep existing examples */}

      {/* Radio Examples */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Radio Component Examples</h1>
        
        {/* Basic Radio Group */}
        <Radio.Group
          label="Select a Fruit"
          name="fruits"
          value={radioValues.fruits}
          onChange={(value) => setRadioValues(prev => ({ ...prev, fruits: value }))}
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'orange', label: 'Orange' },
          ]}
          hint="Choose your favorite fruit"
        />

        {/* Horizontal Radio Group */}
        <Radio.Group
          label="Select Size"
          name="size"
          value={radioValues.size}
          onChange={(value) => setRadioValues(prev => ({ ...prev, size: value }))}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ]}
          horizontal
        />

        {/* Radio Group with Error */}
        <Radio.Group
          label="Preferred Contact Method"
          name="contact"
          value={radioValues.contact}
          onChange={(value) => setRadioValues(prev => ({ ...prev, contact: value }))}
          options={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'mail', label: 'Mail' },
          ]}
          error="Please select a contact method"
          required
        />

        {/* Radio Group with Disabled Options */}
        <Radio.Group
          label="Programming Language"
          name="programming"
          value={radioValues.programming}
          onChange={(value) => setRadioValues(prev => ({ ...prev, programming: value }))}
          options={[
            { value: 'javascript', label: 'JavaScript' },
            { value: 'python', label: 'Python' },
            { value: 'ruby', label: 'Ruby', disabled: true },
            { value: 'java', label: 'Java' },
          ]}
          size="lg"
        />

        {/* Individual Radio Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Individual Radio Components</h2>
          
          {/* Different Sizes */}
          <div className="space-y-2">
            <Radio
              name="size-demo"
              value="small"
              label="Small Radio"
              size="sm"
            />
            <Radio
              name="size-demo"
              value="medium"
              label="Medium Radio"
              size="md"
            />
            <Radio
              name="size-demo"
              value="large"
              label="Large Radio"
              size="lg"
            />
          </div>

          {/* States */}
          <div className="space-y-2">
            <Radio
              name="states"
              value="disabled"
              label="Disabled Radio"
              disabled
            />
            <Radio
              name="states"
              value="error"
              label="Error State"
              error="This is an error message"
            />
            <Radio
              name="states"
              value="hint"
              label="With Hint"
              hint="This is a hint message"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadioComponentExamples;