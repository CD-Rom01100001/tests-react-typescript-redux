import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { useAppDispatch } from '../../../store/hooks';
import { setStateAlert } from '../../../store/slices';
import css from './testTime.module.css'

const TestTime: FC = () => {

  const defineEndTestSlice = useAppSelector(state => state.defineEndTestIndex.defineEnd)
  const dispatch = useAppDispatch()

  const location = useLocation().pathname.match(/^\/training\/stage-\d+$/)// проверка на соответствие шаблона адреса
  const [time, setTime] = useState(location ? 0 : 900);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(true)
  }, [])

  /* условия для остановки времени */
  useEffect(() => {
    if (location) {
      if (Math.floor((time / 60) % 60) === 60) {
        setRunning(false)
        dispatch(setStateAlert('open'))
      }
    } 
    else {
      if (time === 0) {
        setRunning(false);
        dispatch(setStateAlert('open'));
      }
    }
    if (defineEndTestSlice === true) {
      setRunning(false)
    }
  }, [dispatch, time, defineEndTestSlice, location])

  useEffect(() => {
    let interval: number | undefined;
    if (location) {
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      } else if (!running) {
        clearInterval(interval);
      }
    }
    else {
      if (running && time > 0) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
          console.log(time);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [location, running, time]);

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