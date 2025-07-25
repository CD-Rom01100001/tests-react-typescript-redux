import { FC, useRef, useEffect } from 'react';
import { AllQAT } from '../../allStageLink'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setAnswers } from '../../../store/slices';
import css from './questAndAnswers.module.css'

interface QuestAndAnswersProps {
  qA: AllQAT[]
}
type ObjInfoSelectedAnswerType = {
  questionId: number | null;
  answerId: number | null;
  correct: boolean | null;
}

const QuestAndAnswers: FC<QuestAndAnswersProps> = ({qA}) => {
  /* redux */
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const arrayAnswersSlice = useAppSelector(state => state.arrayAnswersIndex.arrayAnswers)
  const defineEndTestSlice = useAppSelector(state => state.defineEndTestIndex.defineEnd)
  const dispatch = useAppDispatch()

  /* при открытии тестов, центр старницы смещается к блоку с вопросом */
  useEffect(() => {
    if(focusBlock.current) {
      focusBlock.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const focusBlock = useRef<HTMLDivElement>(null)

  /* в Buttons мы установили dispatch(getIndicatorId(-1)), хоть он сразу-же перерисовывается на dispatch(getIndicatorId(0)), лучше перестраховаться и написать проверку */
  if (indicatorId < 0 || !qA[indicatorId]) {
    return <h3>Загрузка вопроса...</h3>
  }

  /* макет объекта с ответами */
  const objInfoSelectedAnswer: ObjInfoSelectedAnswerType = {
    questionId: null,
    answerId: null,
    correct: null,
  }

  const answerCreateArray = () => {
    dispatch(
      setAnswers({
        index: indicatorId,
        value: objInfoSelectedAnswer
      })
    )
  }

  const createObjInfoSelectedAnswer = (id: number, answerCorrect: boolean) => {
    objInfoSelectedAnswer.answerId = id
    objInfoSelectedAnswer.questionId = indicatorId
    objInfoSelectedAnswer.correct = answerCorrect
  }

  const setClassName = (shuffled: boolean, answerCorrect: boolean): string => {
    const arrayClasses: string[] = [css.answer];
  
    /* если тест НЕ ЗАКОНЧЕН */
    if (shuffled === true) {
      arrayClasses.push(css.active);
    }
  
    /* если тест ЗАКОНЧЕН */
    if (defineEndTestSlice) {

      /* блокирует возможность выбора ответа */
      arrayClasses.push(css.questAndAnswersEnd)
  
      // Если правильный ответ
      if (shuffled && answerCorrect) {
        arrayClasses.push(css.rightAnswer);
      }
  
      // Если неправильный ответ
      if (shuffled && !answerCorrect) {
        arrayClasses.push(css.wrongAnswer);
      }
  
      // Всегда показываем правильный ответ
      if (answerCorrect && !shuffled) {
        arrayClasses.push(css.active);
      }
    }
  
    return arrayClasses.join(' ');
  }
  
  const setAnswerFooter = (shuffled: boolean, answerCorrect: boolean/* , userSelected: boolean */): string => {
    if (!defineEndTestSlice) return ''; // Если тест не завершен, текст не показываем
  
    const answerWrongOrRight = arrayAnswersSlice[indicatorId]?.correct;
    const userSelected = shuffled && arrayAnswersSlice[indicatorId]?.correct !== answerCorrect;// если был выбран ответ и значение ключа correct из объекта arrayAnswersSlice не совпадает со значением ключа correct объекта answer
  
    // Если тест завершен
    if (defineEndTestSlice) {

      if (shuffled && answerWrongOrRight) {
        return 'Ваш ответ верный ✅';  // Текст для правильного ответа
      }
  
      if (shuffled && !answerWrongOrRight) {
        return 'Ваш ответ неверный ❌';  // Текст для неправильного ответа
      }
  
      // Если ответ был правильный и не выбран, показываем правильный ответ
      if (answerCorrect && !userSelected) {
        return `правильный ответ ✔️`; // Показываем правильный ответ
      }

    }
  
    return '';
  }
  
  return (
    <div className={css.questAndAnswers}>
      <p className={css.question} ref={focusBlock}>{qA[indicatorId]?.question}</p>

      {qA[indicatorId]?.answers.map((answer, id) => {
        const shuffled = arrayAnswersSlice[indicatorId]?.answerId === id;  // Проверка, был ли выбран этот ответ
        const answerCorrect = answer.correct;  // Проверка, является ли ответ правильным
        return (
          <button 
            className={setClassName(shuffled, answerCorrect)}
            onClick={()=>{
              console.log(answerCorrect);
              createObjInfoSelectedAnswer(id, answerCorrect)
              answerCreateArray()// помещает объект в массив Slice
            }}
            key={answer.id}
          >
            {answer.value}
            <span className={css.answerFooter}>
              {setAnswerFooter(shuffled, answerCorrect)}
            </span>
          </button>
        )
      })}

    </div>
  );
}

export default QuestAndAnswers;