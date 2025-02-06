
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from './atoms/Accordion/Accordion';

function AccordionComponentExamples() {
  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Accordion Examples</h1>

      {/* Single Expansion */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Single Expansion</h2>
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match your theme.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Multiple Expansion */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Multiple Expansion</h2>
        <Accordion type="multiple" className="rounded-md border border-gray-200">
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I expand multiple items?</AccordionTrigger>
            <AccordionContent>
              Yes. Just set the <code>type</code> prop to <code>multiple</code>.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Can it be disabled?</AccordionTrigger>
            <AccordionContent>
              Yes. You can disable individual items.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" disabled>
            <AccordionTrigger>Is this item disabled?</AccordionTrigger>
            <AccordionContent>
              Yes. This item is disabled.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Separated Style */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Separated Variant</h2>
        <Accordion type="single" variant="separated">
          <AccordionItem value="item-1" className="rounded-lg border border-gray-200">
            <AccordionTrigger>What about different styles?</AccordionTrigger>
            <AccordionContent>
              Yes. You can use <code>variant</code> like "separated" or "bordered".
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="rounded-lg border border-gray-200">
            <AccordionTrigger>Custom icons?</AccordionTrigger>
            <AccordionContent>
              Yes. You can customize the expand/collapse icon via the <code>icon</code> prop.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

export default AccordionComponentExamples;
