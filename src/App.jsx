import { useEffect, useRef, useState } from "react";
import { formatTime } from "./utils/formatTime";
import { useStopwatch } from "./hooks/useStopwatch";
import { Passage } from "./components/Passage";
import passages from "./data.json";
import { getRandomIndex } from "./utils/getRandomIndex";
import { Header } from "./components/Header";
import { Controls } from "./components/Controls";
import { Dropdown } from "./components/Dropdown";

function App() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [mode, setMode] = useState("timed");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [currentPassage, setCurrentPassage] = useState(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const inputRef = useRef(null);

  const { elapsedSeconds, start } = useStopwatch();
  const intervalRef = useRef(null);

  useEffect(() => {
    const list = passages[difficultyLevel];
    const randomIndex = getRandomIndex(list.length);

    setCurrentPassage(list[randomIndex]);
  }, [difficultyLevel]);

  const startTest = () => {
    if (isTestStarted) return;

    setIsTestStarted(true);

    if (mode === "timed") {
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
    } else {
      // start stopwatch
      start();
    }
  };

  useEffect(() => {
    const handleKeyDown = () => {
      inputRef.current?.focus();
      startTest();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTestStarted, mode]);

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleDifficultyLevel = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const handleClickOnPassage = () => {
    setIsTestStarted(true);
    inputRef.current?.focus();
    startTest();
  };

  const handleTyping = (e) => {
    setTypedText(e.target.value);
  };

  return (
    <div className="p-4 md:p-8 pb-0">
      <Header bestResult={92} />
      <div>
        <Controls
          mode={mode === "timed" ? secondsLeft : formatTime(elapsedSeconds)}
        />
        <Dropdown />
      </div>
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

      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleTyping}
        autoComplete="off"
        spellCheck={false}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <p>{typedText}</p>

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
      {!isTestStarted && (
        <button
          onClick={() => {
            inputRef.current?.focus();
            startTest();
          }}
        >
          Start Typing Test
        </button>
      )}
    </div>
  );
}

export default App;
