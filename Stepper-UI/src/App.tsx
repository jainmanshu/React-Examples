import "./App.css";
import Stepper from "./components/Stepper";

const config = [
  { name: "Step 1", Component: () => <div>This is component 1</div> },
  { name: "Step 2", Component: () => <div>This is component 2</div> },
  { name: "Step 3", Component: () => <div>This is component 3</div> },
  { name: "Step 4", Component: () => <div>This is component 4</div> },
];

function App() {
  return <Stepper stepsConfig={config} />;
}

export default App;
