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
  const arrayAnswersSlice = useAppSelector(state => state.arrayAnswersIndex.arrayAnswers)
  const defineEndTestSlice = useAppSelector(state => state.defineEndTestIndex.defineEnd)
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    console.log(arrayAnswersSlice);
  }, [arrayAnswersSlice])

  /* states */
  const [clickedEvent, setClickEvent] = useState('1');

  /* навигация при нажитии на индикатор */
  useEffect(()=>{
    dispatch(getIndicatorId(indicatorId))
    // console.log(indicatorId);
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

  /* устанавливает стили в зависимости от прохождения теста */
  const setClassName = (numName: number): string => {
    const answer = arrayAnswersSlice[numName]
    const arrayClasses: string[] = [css.indicator]// добавили базовый класс в начало массива/строки класса

    /* если индекс индикатора совпадает с айдишником индикатора то присваивает класс active */
    if (numName === indicatorId) {
      arrayClasses.push(css.active)
    }
    /* если тест не закончен и индекс выбраного вопроса совпадает с индексом индикатора, то индикатор стилизуется */
    if (defineEndTestSlice === false && answer?.questionId === numName) {
      arrayClasses.push(css.selectAnswer)
    }
    /* если тест закончен и индекс выбраного вопроса совпадает с индексом индикатора то переходим к дальнейшему условию */
    if (defineEndTestSlice === true && answer?.questionId === numName) {
      /* если в ключе correct выбраного вопроса true то срабатывает соответствующий стиль */
      if (answer.correct) {
        arrayClasses.push(css.rightAnswer)
      }
      /* если в ключе correct выбраного вопроса false то срабатывает соответствующий стиль */
      else {
        arrayClasses.push(css.wrongAnswer)
      }
    }
    /* делаем из массива строку для класса */
    return arrayClasses.join(' ')
  }
  
  return (
    <div className={css.blockIndicators}>
      {listQuestions.map((_, numName) => {
        return (
        <button 
          name={`${numName+1}`} 
          onClick={(event)=>{
            dispatch(getIndicatorId(Number(event.currentTarget.name)-1))
          }}
          className={setClassName(numName)}
          key={numName}>
          {numName+1}
        </button>)
      })}
    </div>
  );
}

export default Indicator;


