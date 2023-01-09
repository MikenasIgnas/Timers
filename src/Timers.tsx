/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';

const Title = () => {
  const initialTimer2Seconds = 5;
  const initialTimer2Minutes = 0;
  const [secondsT1, setSecondsT1] = React.useState(0);
  const [minutesT1, setMinutesT1] = React.useState(0);
  const [secondsT2, setSecondsT2] = React.useState(initialTimer2Seconds);
  const [minutesT2, setMinutesT2] = React.useState(initialTimer2Minutes);
  const [randomBackgroundColor, setBackgroundColor] = React.useState('');
  const [activateTimerReset, setActivateTimerReset] = React.useState(true);
  const [timerFinished, setTimerFinished] = React.useState(false);
  const [displayTimer, setDisplayTimer] = React.useState(true);

  React.useEffect(() => {
     const timer = setInterval(() => {
      setSecondsT1(secondsT1 + 1);
        if (secondsT1 === 59) {
          setMinutesT1(minutesT1 + 1);
          setSecondsT1(0);
        }
        if (secondsT1 % 5 === 0) {
          const randomColor = Math.floor(Math.random() * 16777215).toString(16);
          document.body.style.backgroundColor = `#${randomColor}`;
          setBackgroundColor(randomColor);
        }
      }, 1000);
      return () => clearInterval(timer);
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
     setSecondsT2(secondsT2 - 1);
       if (displayTimer === true && secondsT2 === 0) {
         setMinutesT2(minutesT2 - 1);
         setSecondsT2(59);
       }
     }, 1000);
     if (!activateTimerReset) {
      setSecondsT2(initialTimer2Seconds);
      setMinutesT2(initialTimer2Minutes);
      setActivateTimerReset(!activateTimerReset);
     }
     if (secondsT2 === 0 && minutesT2 === 0) {
      setTimerFinished(!timerFinished);
      setDisplayTimer(false);
     }

     return () => clearInterval(timer);
 }, [secondsT2, minutesT2]);

 const resetTimer = () => {
  setActivateTimerReset(false);
  setDisplayTimer(true);
  setSecondsT2(initialTimer2Seconds);
  setMinutesT2(initialTimer2Minutes);
};

  return (
    <div style={{ backgroundColor: randomBackgroundColor }} className="TimerContainer" tabIndex={0} onKeyDown={resetTimer} onMouseOver={resetTimer}>
      <div className="Timer1">
        <div>{minutesT1}</div>
        <div>:</div>
        <div>{secondsT1}</div>
      </div>
      <div className="Timer2" style={{ visibility: displayTimer ? 'visible' : 'hidden' }}>
        <div>{minutesT2}</div>
        <div>:</div>
        <div>{secondsT2}</div>
      </div>
    </div>
    );
};

export default Title;
