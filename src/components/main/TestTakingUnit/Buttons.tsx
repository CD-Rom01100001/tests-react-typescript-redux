import { FC, useEffect, useState } from 'react';
import { AllQAT } from '../../allStageLink';
import css from './buttons.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getIndicatorId, setFullAnswers } from '../../../store/slices';

interface ButtonsI {
  numberOfQuestions: AllQAT[];
}

const Buttons: FC<ButtonsI> = ({ numberOfQuestions}) => {
  /* redux */
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const arrayAnswersSlice = useAppSelector(state => state.arrayAnswersIndex.arrayAnswers)
  const dispatch = useAppDispatch()

  /* states */
  const [end, setEnd] = useState<boolean>(false)
  const [resultText, setResultText] = useState<string>('')
  const [righttAnswers, setRightAnswers] = useState<number>(0)
  const [wrongAnswers, setWrongAnswers] = useState<number>(0)

  const result = () => {
    setEnd(true)
    const newArray = [...arrayAnswersSlice]
    if (newArray.length < numberOfQuestions.length) {
      while (newArray.length < numberOfQuestions.length) {
        newArray.push(null);
      }
      // Прямого сеттера массива нет — добавим новый экшен
      dispatch(setFullAnswers(newArray));
    }
    console.log(newArray);

    /* если не выбрал не один из ответов */
    if (newArray.length === 0) {
      setWrongAnswers(numberOfQuestions.length)
      setResultText('Вы не прошли этап!');
      return;
    }

    let right = 0;
    let wrong = 0;

    newArray.forEach(elem => {
      /* если выбрал правельный ответ, то +1 к правельным ответам */
      if (elem && elem.correct === true) right++
      /* если выбрал не правельный ответ, то +1 к ошибкам */
      if (elem === null || elem.correct === false) wrong++ 
    })

    setRightAnswers(right);
    setWrongAnswers(wrong);

    /* если меньше трех ошибок то прошли */
    if (right > numberOfQuestions.length-3) {
      setResultText('Вы прошли этап!')
    } else {
      setResultText('Вы не прошли этап!')
    }
  }

  const restart = () => {
    window.location.reload()
  }

  return (
    <div className={css.buttons}>
      {indicatorId >= 1 && end === false && (
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
      {indicatorId === numberOfQuestions.length-1 && end === false && (
        <button className={css.buttonNav} onClick={result}>
          Результат
        </button>
      )}

      
      {end === true && (
        <div className={css.resultBlock}>
          <button className={css.buttonNav} onClick={restart}>
            Заново
          </button>
          <div className={css.results}>
            <p className={css.resultText}>
              {resultText}
            </p>
            <p className={css.righttAnswers}>
              Правельных ответов: {righttAnswers}
            </p>
            <p className={css.wrongAnswers}>
              Ошибок: {wrongAnswers}
            </p>
            <p className={css.procentPassed}>
              Пройдено {Math.round((righttAnswers/numberOfQuestions.length)*100)}%
            </p>
            </div>
          </div>
      )}
    </div>
  );
}

export default Buttons;