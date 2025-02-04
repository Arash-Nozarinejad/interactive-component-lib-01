import BageComponentExamples from "./components/BageComponentExamples";
import ButtonComponentExample from "./components/ButtonComponentExamples";
import CardComponentExamples from "./components/CardComponentExamples";
import CheckboxComponentExamples from "./components/CheckBoxComponentExamples";
import InputComponentExample from "./components/InputComponentExamples";
import RadioComponentExamples from "./components/RadioComponentExamples";
import SelectComponentExamples from "./components/SelectComponentExamples";
import SelectComponentExamplesUpdated from "./components/SelectComponentExamplesUpdated";

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
    </div>
  );
}

export default App;