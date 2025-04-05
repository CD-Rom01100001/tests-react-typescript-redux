import { FC, useEffect, useState } from 'react';
import { AllQAT } from '../../allStageLink';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getIndicatorId } from '../../../store/slices';

import css from './indicator.module.css'
interface IndicatorProps {
  listQuestions: AllQAT[];
}

const Indicator: FC<IndicatorProps> = ({ listQuestions }) => {
  /* redux */
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const dispatch = useAppDispatch();

  /* states */
  const [clickedEvent, setClickEvent] = useState('1');

  /* навигация при нажитии на индикатор */
  useEffect(()=>{
    dispatch(getIndicatorId(indicatorId))
    console.log(indicatorId);
  }, [dispatch, indicatorId])

  /* навигация при нажатии на кнопки клавиатуры */
  useEffect(() => {
    const handleKeyDown = (event: {key: string}) => {
      if (event.key === "ArrowRight") {
        if (indicatorId >= listQuestions.length-1) return 
        dispatch(getIndicatorId(indicatorId+1))
        setClickEvent(`${+clickedEvent + 1}`)
      }
      if (event.key === "ArrowLeft") {
        if (indicatorId <= 0) return
        dispatch(getIndicatorId(indicatorId-1))
        setClickEvent(`${+clickedEvent - 1}`)
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clickedEvent, dispatch, indicatorId, listQuestions.length]);
  
  return (
    <div className={css.blockIndicators}>
      {listQuestions.map((_, numName) => {
        return (
        <button 
          name={`${numName+1}`} 
          onClick={(event)=>{
            dispatch(getIndicatorId(Number(event.currentTarget.name)-1))
          }}
          className={numName === indicatorId ? css.active : css.indicator}
          key={numName}>
          {numName+1}
        </button>)
      })}
    </div>
  );
}

export default Indicator;


