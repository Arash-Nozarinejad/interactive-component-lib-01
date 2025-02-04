import BageComponentExamples from "./components/BageComponentExamples";
import ButtonComponentExample from "./components/ButtonComponentExamples";
import CheckboxComponentExamples from "./components/CheckBoxComponentExamples";
import InputComponentExample from "./components/InputComponentExamples";
import SelectComponentExamples from "./components/SelectComponentExamples";

function App() {
  return (
    <div className="flex flex-wrap m-2 space-x-4">
      <ButtonComponentExample />
      <InputComponentExample />
      <CheckboxComponentExamples />
      <SelectComponentExamples />
      <BageComponentExamples />
    </div>
  );
}

export default App;