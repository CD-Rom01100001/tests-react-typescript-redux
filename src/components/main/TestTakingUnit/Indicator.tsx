import { FC, useEffect, useState } from 'react';
import { AllQAT } from '../../allStageLink';
import css from './indicator.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getIndicatorId } from '../../../store/slices';
interface IndicatorProps {
  listQuestions: AllQAT[];
  doAfterClick: (event: string) => void
}

const Indicator: FC<IndicatorProps> = ({listQuestions, doAfterClick }) => {
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const dispatch = useAppDispatch();
  const [clickedId, setClickedId] = useState(0);
  const [clickedEvent, setClickEvent] = useState('1');

  useEffect(()=>{
    setClickedId(clickedId);
    doAfterClick(clickedEvent);
  }, [clickedEvent, clickedId, doAfterClick])

  useEffect(() => {
    const handleKeyDown = (event: {key: string}) => {
      if (event.key === "ArrowRight") {
        if (clickedId >= listQuestions.length-1) return 
        console.log('right - ' + clickedEvent);
        setClickedId(clickedId+1)
        setClickEvent(`${+clickedEvent + 1}`)
        doAfterClick(clickedEvent);
      }
      if (event.key === "ArrowLeft") {
        if (clickedId <= 0) return
        console.log('left - ' + clickedEvent);
        setClickedId(clickedId-1)
        setClickEvent(`${+clickedEvent - 1}`)
        doAfterClick(clickedEvent);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clickedEvent, clickedId, doAfterClick, indicatorId, listQuestions.length]);
  
  return (
    <div className={css.blockIndicators}>
      {listQuestions.map((_, numName) => {
        return (
        <button 
          name={`${numName+1}`} 
          onClick={(event)=>{
            setClickedId(numName)
            setClickEvent(event.currentTarget.name)
            dispatch(getIndicatorId(Number(event.currentTarget.name)-1))
          }}
          className={numName === clickedId ? css.active : css.indicator}
          key={numName}>
          {numName+1}
        </button>)
      })}
    </div>
  );
}

export default Indicator;


