import { useEffect, useState } from "react";
import "./App.css";
import Light from "./components/Light";

const config = {
  red: {
    backgroundColor: "red",
    duration: 1000,
    next: "green",
  },
  yellow: {
    backgroundColor: "yellow",
    duration: 1000,
    next: "red",
  },
  green: {
    backgroundColor: "green",
    duration: 1000,
    next: "yellow",
  },
};

function App() {
  const [activeLight, setActiveLight] = useState("green");

  useEffect(() => {
    const { duration, next } = config[activeLight];

    const interval = setTimeout(() => setActiveLight(next), duration);

    return () => clearTimeout(interval);
  }, [activeLight]);

  return (
    <div>
      <div id="light-container">
        {Object.keys(config).map((color) => (
          <Light
            key={color}
            color={
              color === activeLight ? config[color]?.backgroundColor : null
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
