import { FC, useEffect, useState } from 'react';
import css from './testTime.module.css'
import { useAppDispatch } from '../../../store/hooks';
import { setStateAlert } from '../../../store/slices';

const TestTime: FC = () => {

  const dispatch = useAppDispatch()

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);  

  useEffect(() => {
    setRunning(true)
  }, [])

  useEffect(() => {
    if (Math.floor((time / 60) % 60) === 60) {
      setRunning(false)
      dispatch(setStateAlert('open'))
    }
  }, [time])

  useEffect(() => {
    console.log('run');
    let interval: number | undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 1) % 60)).slice(-2)}</span>
      </div>
    </div>
  );
}

export default TestTime;