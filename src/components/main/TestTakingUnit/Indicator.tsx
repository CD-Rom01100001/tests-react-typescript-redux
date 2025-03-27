import { FC, useState } from 'react';
import { AllQAT } from '../../allStageLink';
import css from './indicator.module.css'
interface IndicatorProps {
  listQuestions: AllQAT[];
  doAfterClick: (event: string) => void
}

const Indicator: FC<IndicatorProps> = ({listQuestions, doAfterClick }) => {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (event: string, id: number) => {
    setClickedId(id);
    doAfterClick(event);
  };

  return (
    <div className={css.blockIndicators}>
      {listQuestions.map((_, numName) => {
        return (
        <button 
          name={`${numName+1}`} 
          onClick={(event)=>{
            handleClick(event.currentTarget.name, numName)
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


