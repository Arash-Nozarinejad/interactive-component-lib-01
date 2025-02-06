import { useState } from 'react';
import { Progress } from './atoms/Progress/Progress';

function ProgressComponentExamples() {
  // State to control which example is visible.
  const [activeExample, setActiveExample] = useState<string | null>(null);

  // Render different progress bar examples based on activeExample state.
  const renderProgressExample = () => {
    switch (activeExample) {
      case 'basic':
        return <Progress value={60} />;
      case 'label':
        return <Progress value={75} label="Upload Progress" showValue />;
      case 'sizes':
        return (
          <div className="space-y-4">
            <Progress value={40} size="sm" />
            <Progress value={60} size="md" />
            <Progress value={80} size="lg" />
          </div>
        );
      case 'variants':
        return (
          <div className="space-y-4">
            <Progress value={25} variant="default" />
            <Progress value={50} variant="success" />
            <Progress value={75} variant="warning" />
            <Progress value={90} variant="error" />
          </div>
        );
      case 'striped':
        return <Progress value={65} striped />;
      case 'animated':
        return <Progress value={65} striped animated />;
      case 'indeterminate':
        return <Progress value={0} indeterminate />;
      case 'custom':
        return (
          <Progress
            value={1337}
            max={8192}
            showValue
            valueFormat={(value, max) =>
              `${value.toLocaleString()} / ${max.toLocaleString()} bytes`
            }
          />
        );
      default:
        return <p>Please select a progress example.</p>;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Buttons to switch between examples */}
      <div className="space-x-2">
        <button onClick={() => setActiveExample('basic')} className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Basic
        </button>
        <button onClick={() => setActiveExample('label')} className="rounded-md bg-blue-600 px-4 py-2 text-white">
          With Label
        </button>
        <button onClick={() => setActiveExample('sizes')} className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Sizes
        </button>
        <button onClick={() => setActiveExample('variants')} className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Variants
        </button>
        <button onClick={() => setActiveExample('striped')} className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Striped
        </button>
        <button onClick={() => setActiveExample('animated')} className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Animated
        </button>
        <button onClick={() => setActiveExample('indeterminate')} className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Indeterminate
        </button>
        <button onClick={() => setActiveExample('custom')} className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Custom Format
        </button>
      </div>

      {/* Display the selected example */}
      <div>{renderProgressExample()}</div>
    </div>
  );
}

export default ProgressComponentExamples;
