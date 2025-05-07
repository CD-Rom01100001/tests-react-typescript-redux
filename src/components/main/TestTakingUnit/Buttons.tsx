import { FC, useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AllQAT } from '../../allStageLink';
import css from './buttons.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getIndicatorId, setFullAnswers, defineEndTest, resetTime } from '../../../store/slices';
import { setOpenPreview, setBestResult, setLastResult, getTrainingLocate, setExamHistory } from '../../../store/setResultsSlice';

interface ButtonsI {
  numberOfQuestions: AllQAT[];
  onRestart: () => void;
}

const Buttons: FC<ButtonsI> = ({ numberOfQuestions, onRestart}) => {
  /* redux */
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const arrayAnswersSlice = useAppSelector(state => state.arrayAnswersIndex.arrayAnswers)
  const resultsTrainingData = useAppSelector(state => state.resultsDataIndex.resultsTrainingData)
  const previewNumber = useAppSelector(state => state.resultsDataIndex.previewNumber)
  const trainingLocate = useAppSelector(state => state.resultsDataIndex.trainingLocate)
  console.log(resultsTrainingData.openPreview)
  console.log('lastResult - ' + resultsTrainingData.lastResult)
  console.log('bestResult - ' + resultsTrainingData.bestResult)
  console.log(resultsTrainingData)
  
  const dispatch = useAppDispatch()

  /* states */
  const [end, setEnd] = useState<boolean>(false)
  const [resultText, setResultText] = useState<string>('')
  const [righttAnswers, setRightAnswers] = useState<number>(0)
  const [wrongAnswers, setWrongAnswers] = useState<number>(0)

  const pathname = useLocation().pathname;
  const location = useMemo(() => pathname.match(/^\/training\/stage-\d+$/), [pathname])
 
  useEffect(() => {
    /* определяет в редьюсер на какой странице мы находимся */
    const mode = location ? 'training' : 'exam'
    dispatch(getTrainingLocate(mode))
  }, [dispatch, location])

  const result = () => {
    setEnd(true)
    dispatch(defineEndTest(true))

    const newArray = [...arrayAnswersSlice]// создал копию массива arrayAnswersSlice для того, что-бы этот массив был имутабельным
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()

    /* заполняет массив null */
    if (newArray.length < numberOfQuestions.length) {
      while (newArray.length < numberOfQuestions.length) {
        newArray.push(null);
      }
      // Прямого сеттера массива нет — добавим новый экшен
      dispatch(setFullAnswers(newArray));
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

    const resultString = `${Math.round((right / numberOfQuestions.length) * 100)}% (${date})`;
    const resultStringExam = `пройдено ${Math.round((right / numberOfQuestions.length) * 100)}% (${date} в ${time})`;

    /* определим на какой странице мы находимся и в зависимости от этого определим условие */
    const setTheCondition = location ? numberOfQuestions.length-34 : numberOfQuestions.length-1//! поменять на numberOfQuestions.length-3!!!!!!!!!!

    if (right >= setTheCondition) {
      dispatch(setOpenPreview(previewNumber+1))// добавляет в массив номер разблокированного этапа
      dispatch(setBestResult(resultString))// добавляет лучший результат
      dispatch(setLastResult(resultString))// добавляет последний результат
      dispatch(setExamHistory(resultStringExam))// добавляет результат экзамена
      setResultText('Вы прошли этап! 🙂')
    } else {
      dispatch(setLastResult(resultString))// добавляет последний результат
      dispatch(setBestResult(resultString))// добавляет лучший результат
      dispatch(setExamHistory(resultStringExam))// добавляет результат экзамена
      setResultText('Вы не прошли этап! 🙁')
    }
    
  }

  const restart = () => {
    dispatch(setFullAnswers([])); // очистить ответы
    dispatch(getIndicatorId(-1))// Redux не вызывает обновление, если значение не изменилось. То есть если currentIndicatorId уже равен 0, и я снова диспатчю getIndicatorId(0), то state не меняется, и React не видит причины перерисовывать компонент. Поэтому вызовим сначало недействительное значение.
    setTimeout(() => dispatch(getIndicatorId(0)), 0); // а затем вызовим действительное значение
    dispatch(defineEndTest(false)); // сбросить завершённость теста
    setEnd(false); // сбросить локальное состояние
    dispatch(resetTime())// сброс времени
    setRightAnswers(0);
    setWrongAnswers(0);
    setResultText('');
    onRestart(); // для пересоздания массива вопросов
  }


  return (
    <div className={css.buttons}>
      {indicatorId >= 1 && 
      end === false && (
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
      {indicatorId >= 0 && 
      indicatorId < numberOfQuestions.length-1 && 
      end === false && (
        <button 
          className={css.buttonNav}
          onClick={()=>{
            if (indicatorId === numberOfQuestions.length-1) return
            dispatch(getIndicatorId(indicatorId+1))
          }}
        >
          Далее
        </button>
      )}
      {indicatorId === numberOfQuestions.length-1 && 
      end === false && (
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
              Правильных ответов: {righttAnswers}
            </p>
            <p className={css.wrongAnswers}>
              Ошибок: {wrongAnswers}
            </p>
            <p className={css.procentPassed}>
              Пройдено: {Math.round((righttAnswers/numberOfQuestions.length)*100)}%
            </p>
            </div>
          </div>
      )}
    </div>
  );
}

export default Buttons;