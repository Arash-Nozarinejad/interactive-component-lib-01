import { Progress } from './atoms/Progress/Progress';

function ProgressComponentExamples() {
  return (
    <div className="space-y-6 p-4">
      {/* Basic Progress */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Basic Progress</h2>
        <Progress value={60} />
      </section>

      {/* With Label and Value */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Progress with Label and Value</h2>
        <Progress value={75} label="Upload Progress" showValue />
      </section>

      {/* Sizes */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Sizes</h2>
        <div className="space-y-4">
          <Progress value={40} size="sm" />
          <Progress value={60} size="md" />
          <Progress value={80} size="lg" />
        </div>
      </section>

      {/* Variants */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Variants</h2>
        <div className="space-y-4">
          <Progress value={25} variant="default" />
          <Progress value={50} variant="success" />
          <Progress value={75} variant="warning" />
          <Progress value={90} variant="error" />
        </div>
      </section>

      {/* Striped Progress */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Striped Progress</h2>
        <Progress value={65} striped />
      </section>

      {/* Animated Stripes */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Animated Striped Progress</h2>
        <Progress value={65} striped animated />
      </section>

      {/* Indeterminate Progress */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Indeterminate Progress</h2>
        <Progress value={0} indeterminate />
      </section>

      {/* Custom Value Format */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Custom Value Format</h2>
        <Progress
          value={1337}
          max={8192}
          showValue
          valueFormat={(value, max) =>
            `${value.toLocaleString()} / ${max.toLocaleString()} bytes`
          }
        />
      </section>
    </div>
  );
}

export default ProgressComponentExamples;

//ProgressComponentExamples
