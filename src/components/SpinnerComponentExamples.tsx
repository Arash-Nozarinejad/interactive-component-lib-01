import { Spinner, DotsSpinner } from "./atoms/Spinner/Spinner";

function SpinnerExamples() {
  return (
    <div className="space-y-8 p-4">
      {/* Basic Spinners */}
      <div className="space-x-4">
        <Spinner />
        <Spinner showText />
        <DotsSpinner />
      </div>

      {/* Sizes */}
      <div className="space-x-4">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>

      {/* Variants */}
      <div className="space-x-4">
        <Spinner variant="default" />
        <Spinner variant="primary" />
        <Spinner variant="secondary" />
        <Spinner variant="success" />
        <Spinner variant="error" />
      </div>

      {/* Text Positions */}
      <div className="grid grid-cols-2 gap-4">
        <Spinner showText textPosition="left" />
        <Spinner showText textPosition="right" />
        <Spinner showText textPosition="top" />
        <Spinner showText textPosition="bottom" />
      </div>

      {/* With Delay */}
      <Spinner delayMs={1000} showText text="Loading with delay..." />

      {/* Centered Spinner in a Container */}
      <div className="relative h-32 w-full rounded-lg border-2 border-dashed">
        <Spinner centered />
      </div>

      {/* Alternative Style: DotsSpinner Examples */}
      <div className="space-x-4">
        <DotsSpinner size="sm" />
        <DotsSpinner />
        <DotsSpinner size="lg" />
      </div>
    </div>
  );
}

export default SpinnerExamples;
