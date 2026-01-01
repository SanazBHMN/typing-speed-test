import { useRef, useState } from "react";
import { formatTime } from "./utils/formatTime";
import { useStopwatch } from "./hooks/useStopwatch";

function App() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [mode, setMode] = useState("timed");
  const { elapsedSeconds, start } = useStopwatch();
  const intervalRef = useRef(null);

  const startCountDown = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div>
      {/* Mode: Timed | Passage */}
      <div>
        <label htmlFor="timed">Timed(60s)</label>
        <input
          type="radio"
          name=""
          id="timed"
          value="timed"
          checked={mode === "timed"}
          onChange={handleModeChange}
        />
        <label htmlFor="passage">Passage</label>
        <input
          type="radio"
          name=""
          id="passage"
          value="passage"
          checked={mode === "passage"}
          onChange={handleModeChange}
        />
      </div>

      <p>{mode === "timed" ? secondsLeft : formatTime(elapsedSeconds)}</p>

      <button onClick={startCountDown}>Start Typing Test</button>
    </div>
  );
}

export default App;
