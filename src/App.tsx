import BageComponentExamples from "./components/BageComponentExamples";
import ButtonComponentExample from "./components/ButtonComponentExamples";
import CardComponentExamples from "./components/CardComponentExamples";
import CheckboxComponentExamples from "./components/CheckBoxComponentExamples";
import InputComponentExample from "./components/InputComponentExamples";
import { LinkComponentExamples } from "./components/LinkComponentExamples";
import RadioComponentExamples from "./components/RadioComponentExamples";
import SelectComponentExamples from "./components/SelectComponentExamples";
import SelectComponentExamplesUpdated from "./components/SelectComponentExamplesUpdated";
import { TextareaExamples } from "./components/TextareaExampleComponents";
import ToggleComponentExamples from "./components/ToggleComponentExamples";
import { AlertExampleWithProvider } from "./components/AlertComponentExamples";
import ProgressComponentExamples from "./components/ProgressComponentExamples";
import SpinnerExamples from "./components/SpinnerComponentExamples";
import TooltipComponentExamples from "./components/TooltipComponentExamples";
import TabCompnentExamples from "./components/TabCompnentExamples";
import BreadcrumbsComponentExamples from "./components/BreadcrumbsComponentExamples";
import PaginationComponentExamples from "./components/PaginationComponentExamples";
import ModalComponentExamples from "./components/ModalComponentExamples";
import AccordionComponentExamples from "./components/AccordionComponentExamples";
import TableComponentExamples from "./components/TableComponentExamples";
import AvatarComponentExamples from "./components/AvatarComponentExamples";
// import UseStateHookExample from "./components/atoms/hooks/UseStateHookExample";

function App() {
  return (
    <div className="flex flex-wrap m-2 space-x-4">
      <ButtonComponentExample />
      <InputComponentExample />
      <CheckboxComponentExamples />
      <SelectComponentExamples />
      <BageComponentExamples />
      <SelectComponentExamplesUpdated />
      <CardComponentExamples />
      <RadioComponentExamples />
      <ToggleComponentExamples />
      <TextareaExamples />
      <LinkComponentExamples />
      <AlertExampleWithProvider />
      <ProgressComponentExamples />
      <SpinnerExamples />
      <TooltipComponentExamples />
      <TabCompnentExamples />
      <BreadcrumbsComponentExamples />
      <PaginationComponentExamples />
      <ModalComponentExamples />
      <AccordionComponentExamples />
      <TableComponentExamples />
      <AvatarComponentExamples />
      {/* <UseStateHookExample /> */}
    </div>
  );
}

export default App;