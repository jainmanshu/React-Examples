import { useState, useEffect } from "react";

export default function useTime() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [fullTime, setFullTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hh = date.getHours() / 12;
      const mm = date.getMinutes() / 60;
      const ss = date.getSeconds() / 60;

      setHours(Math.floor(hh * 360));
      setMinutes(Math.floor(mm * 360));
      setSeconds(Math.floor(ss * 360));
      setFullTime(
        date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { hours, minutes, seconds, fullTime };
}
