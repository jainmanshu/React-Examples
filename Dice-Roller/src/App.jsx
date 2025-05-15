import React, { useState } from "react";
import './App.css'

const Dice = ({ value }) => {
  const dots = {
    1: ["center"],
    2: ["top-left", "bottom-right"],
    3: ["top-left", "center", "bottom-right"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
    6: [
      "top-left",
      "top-right",
      "middle-left",
      "middle-right",
      "bottom-left",
      "bottom-right",
    ],
  };

  return (
    <div className="dice">
      {dots[value].map((pos, idx) => (
        <span key={idx} className={`dot ${pos}`} />
      ))}
    </div>
  );
};

export default function App() {
  const [numDice, setNumDice] = useState(6);
  const [diceValues, setDiceValues] = useState([]);

  const rollDice = () => {
    const values = Array.from(
      { length: numDice },
      () => Math.floor(Math.random() * 6) + 1,
    );
    setDiceValues(values);
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 12) {
      setNumDice(val);
    }
  };

  return (
    <div className="container">
      <h2>Number of Dice</h2>
      <input
        type="number"
        value={numDice}
        min={1}
        max={12}
        onChange={handleInputChange}
      />
      <button onClick={rollDice}>Roll</button>
      <div className="dice-grid">
        {diceValues.map((val, idx) => (
          <Dice key={idx} value={val} />
        ))}
      </div>
    </div>
  );
}
