import { useEffect, useState } from "react";
import "./App.css";
import CircularProgressBar from "./component/CircularProgressBar";
import ProgressBar from "./component/ProgressBar";

function App() {
  const [val, setVal] = useState(0);
  const [intervalId, setIntervalId] = useState<any>(null);

  useEffect(() => {
    if (val < 100) {
      const interval = setInterval(() => {
        setVal((prevVal) => {
          if (prevVal >= 100) {
            clearInterval(interval);
            return prevVal;
          } else {
            return prevVal + 1;
          }
        });
      }, 100);

      setIntervalId(interval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [val]);

  const handleReset = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setVal(0);
  };

  return (
    <>
      <ProgressBar value={val} />
      <CircularProgressBar value={val} />
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default App;
