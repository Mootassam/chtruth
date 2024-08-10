import React, { useState, useEffect } from "react";

const CountdownTimer = ({ startTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(startTime);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete(); // Call the completion callback when time is up
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 1;
        setProgress((newTimeLeft / startTime) * 100);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, startTime, onComplete]);

  return (
    <div className="countdown-timer">
      <div className="timer-progress">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{timeLeft}s</p>
    </div>
  );
};

export default CountdownTimer;
