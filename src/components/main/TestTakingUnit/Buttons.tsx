import { FC, useEffect, useState } from 'react';
import { AllQAT } from '../../allStageLink';
import css from './buttons.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getIndicatorId } from '../../../store/slices';

interface ButtonsI {
  numberOfQuestions: AllQAT[];
}

const Buttons: FC<ButtonsI> = ({ numberOfQuestions}) => {
  /* redux */
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const arrayAnswersSlice = useAppSelector(state => state.arrayAnswersIndex.arrayAnswers)
  const dispatch = useAppDispatch()

  /* states */
  /* при каждой рендеренге selectedAnswer пушится объект из Redux selectedAnswer в массив answerArray */
  // useEffect(() => {
  //   console.log(arrayAnswersSlice)
  // }, [arrayAnswersSlice])
  const [end, setEnd] = useState<boolean>(false)
  const [resultText, setResultText] = useState<string>('')
  const [righttAnswers, setRightAnswers] = useState<number>(0)
  const [wrongAnswers, setWrongAnswers] = useState<number>(0)

  const result = () => {
    setEnd(true)
    console.log(arrayAnswersSlice);

    /* если не выбрал не один из ответов */
    if (arrayAnswersSlice.length === 0) {
      console.log(0);
      setWrongAnswers(numberOfQuestions.length)
    }

    arrayAnswersSlice.forEach(elem => {
      /* если выбрал правельный ответ, то +1 к правельным ответам */
      if (elem && elem.correct === true) 
        setRightAnswers((righttAnswers)=>righttAnswers+1)
      /* если выбрал не правельный ответ, то +1 к не ошибкам */
      if (elem === null || elem.correct === false) 
        setWrongAnswers((wrongAnswers)=>wrongAnswers+1) 
    })
    /* если меньше трех ошибок то прошли */
    if (righttAnswers > numberOfQuestions.length-3) {
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