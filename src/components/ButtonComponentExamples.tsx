import Button from './atoms/Button/Button';

function ButtonComponentExample() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Button Component Examples</h1>
      
      <div className="space-y-2">
        <h2 className="text-xl">Variants</h2>
        <div className="space-x-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl">Sizes</h2>
        <div className="space-x-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl">States</h2>
        <div className="space-x-4">
          <Button onClick={() => alert('Clicked!')}>Clickable</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}

export default ButtonComponentExample;