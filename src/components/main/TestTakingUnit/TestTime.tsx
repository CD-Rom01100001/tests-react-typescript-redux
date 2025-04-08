import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { useAppDispatch } from '../../../store/hooks';
import { setStateAlert } from '../../../store/slices';
import css from './testTime.module.css'

const TestTime: FC = () => {

  const defineEndTestSlice = useAppSelector(state => state.defineEndTestIndex.defineEnd)
  const dispatch = useAppDispatch()

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(true)
  }, [])

  /* условия для остановки времени */
  useEffect(() => {
    if (Math.floor((time / 60) % 60) === 60) {
      setRunning(false)
      dispatch(setStateAlert('open'))
    }
    if (defineEndTestSlice === true) {
      setRunning(false)
    }
  }, [dispatch, time, defineEndTestSlice])

  useEffect(() => {
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
    <div className={css.stopwatch}>
      <div className={css.numbers}>
        <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 1) % 60)).slice(-2)}</span>
      </div>
    </div>
  );
}

export default TestTime;