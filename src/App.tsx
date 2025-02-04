import ButtonComponentExample from "./components/ButtonComponentExamples";
import CheckboxComponentExamples from "./components/CheckBoxComponentExamples";
import InputComponentExample from "./components/InputComponentExamples";
import SelectComponentExamples from "./components/SelectComponentExamples";

function App() {
  return (
    <div className="flex">
      <ButtonComponentExample />
      <InputComponentExample />
      <CheckboxComponentExamples />
      <SelectComponentExamples />
    </div>
  );
}

export default App;