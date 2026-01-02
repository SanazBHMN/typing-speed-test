import { useEffect, useRef, useState } from "react";
import { formatTime } from "./utils/formatTime";
import { useStopwatch } from "./hooks/useStopwatch";
import { Passage } from "./components/Passage";
import passages from "./data.json";
import { getRandomIndex } from "./utils/getRandomIndex";

function App() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [mode, setMode] = useState("timed");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [currentPassage, setCurrentPassage] = useState(null);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const { elapsedSeconds, start } = useStopwatch();
  const intervalRef = useRef(null);

  useEffect(() => {
    const list = passages[difficultyLevel];
    const randomIndex = getRandomIndex(list.length);

    setCurrentPassage(list[randomIndex]);
  }, [difficultyLevel]);

  const startTest = () => {
    setIsTestStarted(true);

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

  const handleDifficultyLevel = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const handleClickOnPassage = () => {
    setIsTestStarted(true);
    startTest();
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid red",
          opacity: `${isTestStarted ? "1" : "20%"}`,
        }}
      >
        <Passage
          passage={currentPassage}
          onPassageClick={handleClickOnPassage}
        />
      </div>

      {/* Difficulty level switch */}
      <div>
        <p>Difficulty:</p>
        <label htmlFor="easy">Easy</label>
        <input
          type="radio"
          name=""
          id="easy"
          value="easy"
          checked={difficultyLevel === "easy"}
          onChange={handleDifficultyLevel}
        />

        <label htmlFor="medium">Medium</label>
        <input
          type="radio"
          name=""
          id="medium"
          value="medium"
          checked={difficultyLevel === "medium"}
          onChange={handleDifficultyLevel}
        />

        <label htmlFor="hard">Hard</label>
        <input
          type="radio"
          name=""
          id="hard"
          value="hard"
          checked={difficultyLevel === "hard"}
          onChange={handleDifficultyLevel}
        />
      </div>
      {/* Mode: Timed | Passage */}
      <div>
        <p>Mode:</p>
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
      {!isTestStarted && <button onClick={startTest}>Start Typing Test</button>}
    </div>
  );
}

export default App;
