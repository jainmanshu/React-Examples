import "./App.css";
import { useState, useEffect } from "react";
import breakify from "./breakify";
import BreakingLogo from "./BreakingLogo";

function App() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [first, setFirst] = useState<string[]>(["", "", ""]);
  const [last, setLast] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    setFirst(breakify(firstName));
  }, [firstName]);

  useEffect(() => {
    setLast(breakify(lastName));
  }, [lastName]);

  return (
    <div className="app">
      <div className="content">
        <BreakingLogo res={first} />
        <BreakingLogo res={last} />
        <div className="row">
          <div className="col">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <button>Breakify</button>
      </div>
    </div>
  );
}

export default App;
