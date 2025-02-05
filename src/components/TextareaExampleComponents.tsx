import { useState } from 'react';
import { Textarea } from './atoms/Textarea/Textarea';

export function TextareaExamples() {
  const [value, setValue] = useState('');
  
  return (
    <div className="space-y-6 p-4">
      {/* Basic Usage */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Basic Textarea</h2>
        <Textarea
          label="Description"
          placeholder="Enter your description here..."
        />
      </section>

      {/* With Helper Text */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">With Helper Text</h2>
        <Textarea
          label="Bio"
          helperText="Write a short bio about yourself"
          placeholder="I am a..."
        />
      </section>

      {/* With Error State */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">With Error</h2>
        <Textarea
          label="Comments"
          error="This field is required"
          placeholder="Enter your comments"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </section>

      {/* With Character Count */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">With Character Count</h2>
        <Textarea
          label="Limited Input"
          showCharCount
          maxLength={100}
          placeholder="Limited to 100 characters"
        />
      </section>

      {/* Auto-resize */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Auto-resize</h2>
        <Textarea
          label="Auto-resize"
          autoResize
          placeholder="This textarea will grow with content..."
        />
      </section>

      {/* Disabled State */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Disabled</h2>
        <Textarea
          label="Disabled"
          disabled
          value="This textarea is disabled"
        />
      </section>

      {/* Required Field */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Required Field</h2>
        <Textarea
          label="Required Field"
          required
          placeholder="This field is required"
        />
      </section>

      {/* Custom Styling */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Custom Styling</h2>
        <Textarea
          label="Custom Styles"
          placeholder="Custom styled textarea"
          className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
          wrapperClassName="bg-purple-50 p-4 rounded-lg"
        />
      </section>
    </div>
  );
}