import { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsRunning(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isRunning && (seconds !== 0 || minutes !== 0)) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div>
      <div>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default PomodoroTimer;
