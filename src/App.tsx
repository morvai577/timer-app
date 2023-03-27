import { useEffect, useState } from 'react';
import './App.css';

// Timer component
const Timer: React.FC = () => {
  // State for the timer (in seconds)
  const [time, setTime] = useState(0);
  // State to handle whether the timer is running or paused
  const [isRunning, setIsRunning] = useState(false);

  // Function to start or pause the timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  // Effect to update the timer every second if it's running
  useEffect(() => {
    if (isRunning) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [isRunning, time]); // Include time in the dependency array

  // Function to format the time as MM : SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h1>{formatTime(time)}</h1>
      <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

// App component
const App: React.FC = () => {
  return (
    <div className="App">
      <Timer />
    </div>
  );
};

export default App;