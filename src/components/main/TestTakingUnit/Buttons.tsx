import { FC, useEffect } from 'react';
import { AllQAT } from '../../allStageLink';
import css from './buttons.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getIndicatorId } from '../../../store/slices';

interface ButtonsI {
  numberOfQuestions: AllQAT[];
}

const Buttons: FC<ButtonsI> = ({ numberOfQuestions}) => {

  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const dispatch = useAppDispatch()

  return (
    <div className={css.buttons}>
      {indicatorId >= 1 && (
        <button 
          className={css.buttonNav}
          onClick={()=>{
            if (indicatorId < 1) return
            dispatch(getIndicatorId(indicatorId-1))
          }}
        >
          Назад
        </button>
      )}
      {indicatorId >= 0 && indicatorId < numberOfQuestions.length-1 && (
        <button 
          className={css.buttonNav}
          onClick={()=>{
            if (indicatorId === numberOfQuestions.length-1) return
            dispatch(getIndicatorId(indicatorId+1))
          }}
        >
          Вперед
        </button>
      )}
      {indicatorId === numberOfQuestions.length-1 && (
        <button className={css.buttonNav}>
          Результат
        </button>
      )}
      {/* {questId >= 0 && (
        <button className={css.buttonNav}>
          Заново
        </button>
      )} */}
    </div>
  );
}

export default Buttons;