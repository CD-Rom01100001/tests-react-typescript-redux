import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { useAppDispatch } from '../../../store/hooks';
import { setEndTime, setStateAlert } from '../../../store/slices';
import css from './testTime.module.css'

const TestTime: FC = () => {

  const defineEndTestSlice = useAppSelector(state => state.defineEndTestIndex.defineEnd)
  const timeKey = useAppSelector(state => state.resetTimeIndex.timeKey)
  const dispatch = useAppDispatch()

  /* Сделал так потаму-что при использовании location в useEffect вызывал бесконечный рендер Это происходило потому, что вызывался useLocation().pathname.match(...) напрямую внутри компонента, что каждый раз создало новый результат, даже при одном и том же pathname. */
  const pathname = useLocation().pathname;
  const location = useMemo(() => pathname.match(/^\/training\/stage-\d+$/), [pathname])// Теперь location будет меняться только при изменении pathname, а не на каждый ререндер.

  const [time, setTime] = useState(location ? 0 : 900);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setTime(location ? 0 : 900)
    setRunning(true)
  }, [timeKey, location])

  /* условия для остановки времени */
  useEffect(() => {
    if (location) {
      if (Math.floor((time / 60) % 60) === 60) {
        setRunning(false)
        dispatch(setEndTime(true))
        dispatch(setStateAlert('open'))
      }
    } 
    else {
      if (time === 0) {
        setRunning(false)
        dispatch(setEndTime(true))
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