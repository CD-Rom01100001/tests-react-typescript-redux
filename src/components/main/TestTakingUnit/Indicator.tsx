import { FC, MouseEvent, SetStateAction, useState } from 'react';
import { AllQAT } from '../../allStageLink';
import css from './indicator.module.css'
interface IndicatorProps {
  listQuestions: AllQAT[];
  doAfterClick: (event: { target: { name: string; }; }) => void
}

const Indicator: FC<IndicatorProps> = ({listQuestions, doAfterClick }) => {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (event: {target: {name: string}}, id: SetStateAction<number>) => {
    setClickedId(id);
    doAfterClick(event);
  };

  return (
    <div className={css.blockIndicators}>
      {listQuestions.map((_, numName) => {
        return (
        <button name={`${numName+1}`} onClick={(event)=>handleClick(event, numName)}
          className={numName === clickedId ? css.active : css.indicator}
          key={numName}>
          {numName+1}
        </button>)
      })}
    </div>
  );
}

export default Indicator;