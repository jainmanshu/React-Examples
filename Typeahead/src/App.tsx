import { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [stateName, setStateName] = useState<string>("");
  const [suggestion, setSuggestion] = useState<any>([]);

  const onChange = (event: any) => {
    const val = event?.target?.value;
    setStateName(val);

    const filteredState = data
      .filter((name: any) => name.name.startsWith(stateName))
      .slice(0, 5);
    stateName && filteredState && setSuggestion(filteredState);
  };

  return (
    <>
      <div>
        <label> Enter state name </label>
        <input
          type="text"
          onChange={onChange}
          id="state"
          name="sate"
          value={stateName}
          style={{ width: 200 }}
        />
        {stateName &&
          suggestion &&
          suggestion.map((sugg: any, index: any) => (
            <ul key={index} onClick={() => setStateName(sugg.name)}>
              State: {sugg.name} , Code: {sugg.abbreviation}
            </ul>
          ))}
      </div>
    </>
  );
}

export default App;
