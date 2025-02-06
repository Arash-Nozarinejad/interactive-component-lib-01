import BageComponentExamples from "./components/BageComponentExamples";
import ButtonComponentExample from "./components/ButtonComponentExamples";
import CardComponentExamples from "./components/CardComponentExamples";
import CheckboxComponentExamples from "./components/CheckBoxComponentExamples";
import InputComponentExample from "./components/InputComponentExamples";
import RadioComponentExamples from "./components/RadioComponentExamples";
import SelectComponentExamples from "./components/SelectComponentExamples";
import SelectComponentExamplesUpdated from "./components/SelectComponentExamplesUpdated";
import { TextareaExamples } from "./components/TextareaExampleComponents";
import ToggleComponentExamples from "./components/ToggleComponentExamples";
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
      {/* <UseStateHookExample /> */}
    </div>
  );
}

export default App;