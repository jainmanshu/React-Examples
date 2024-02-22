import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import "./App.css";

const TIME = 120;

export default function App() {
  const [seconds, setSeconds] = useState(TIME);

  useEffect(() => {
    const i = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1;
        clearInterval(i);
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return <Countdown size={200} timeRemaining={seconds} totalTime={TIME} />;
}
