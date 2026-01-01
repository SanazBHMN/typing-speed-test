import { useRef, useState } from "react";

function App() {
  const [secondsLeft, setSecondsLeft] = useState(60);
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

  return (
    <div>
      <button onClick={startCountDown}>Start Typing Test</button>
      <p>{secondsLeft}</p>
    </div>
  );
}

export default App;
