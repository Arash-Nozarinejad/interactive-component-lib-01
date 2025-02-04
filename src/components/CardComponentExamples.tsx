import Card from "./atoms/Card/Card";
import Button from "./atoms/Button/Button";
import Badge from "./atoms/Badge/Badge";

function CardComponentExamples() {
  return (
    <div className="p-8 space-y-8">
      {/* Keep existing examples */}

      {/* Card Examples */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Card Component Examples</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Card */}
          <Card>
            <Card.Header>
              <Card.Title>Basic Card</Card.Title>
            </Card.Header>
            <Card.Content>
              This is a basic card with header and content.
            </Card.Content>
          </Card>

          {/* Card with Footer */}
          <Card variant="elevated">
            <Card.Header>
              <Card.Title>Card with Footer</Card.Title>
            </Card.Header>
            <Card.Content>
              This card includes a footer with actions.
            </Card.Content>
            <Card.Footer>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </div>
            </Card.Footer>
          </Card>

          {/* Interactive Card */}
          <Card
            variant="bordered"
            hoverEffect
            onClick={() => alert('Card clicked!')}
          >
            <Card.Header>
              <Badge variant="primary" className="mb-2">Interactive</Badge>
              <Card.Title>Clickable Card</Card.Title>
            </Card.Header>
            <Card.Content>
              This entire card is clickable and has a hover effect.
            </Card.Content>
          </Card>

          {/* Flat Card */}
          <Card variant="flat" padding="large">
            <Card.Header>
              <Card.Title>Flat Style Card</Card.Title>
            </Card.Header>
            <Card.Content>
              This card uses the flat style variant with large padding.
            </Card.Content>
          </Card>

          {/* Complex Card */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <Card.Header>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="success" className="mb-2">New</Badge>
                  <Card.Title>Complex Layout</Card.Title>
                </div>
                <Button variant="outline" size="sm">...</Button>
              </div>
            </Card.Header>
            <Card.Content>
              <p className="mb-4">
                This card demonstrates a more complex layout with multiple components.
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">
                  Nested content section
                </p>
              </div>
            </Card.Content>
            <Card.Footer>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Badge variant="info">Tag 1</Badge>
                  <Badge variant="warning">Tag 2</Badge>
                </div>
                <Button size="sm">Action</Button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CardComponentExamples;