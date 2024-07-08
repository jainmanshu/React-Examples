import "./App.css";
import Accordion from "./component/Accordion";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <h1>A simple Accordion</h1>
      <Accordion />
    </div>
  );
}

export default App;
