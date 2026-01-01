import { useRef, useState } from "react";

export function useStopwatch() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stop = () => {};

  const reset = () => {};

  return { elapsedSeconds, start, stop, reset };
}
