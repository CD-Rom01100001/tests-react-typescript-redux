import { FC, useState, useRef, useEffect } from 'react';
import { AllQAT } from '../../allStageLink'
import css from './questAndAnswers.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getIndicatorId, setAnswers } from '../../../store/slices';

interface QuestAndAnswersProps {
  qA: AllQAT[]
}
type ObjInfoSelectedAnswerType = {
  questionId: number | null;
  answerId: number | null;
  correct: boolean | null;
}

// const answerArray: (ObjInfoSelectedAnswerType | null)[] = []

const QuestAndAnswers: FC<QuestAndAnswersProps> = ({qA}) => {
  /* redux */
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const dispatch = useAppDispatch()

  /* states */
  const [clickedId, setClickedId] = useState<number|null>(null)
  const focusBlock = useRef<HTMLDivElement>(null)

  /* при открытии тестов, центр старницы смещается к блоку с вопросом */
  useEffect(() => {
    if(focusBlock.current) {
      focusBlock.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  /* макет объекта с ответами */
  const objInfoSelectedAnswer: ObjInfoSelectedAnswerType = {
    questionId: null,
    answerId: null,
    correct: null,
  }

  // const insertWithNulls = (
  //   arr: (ObjInfoSelectedAnswerType | null)[], 
  //   index: number, 
  //   value: ObjInfoSelectedAnswerType): void => {
  //   while (arr.length < index) {
  //       arr.push(null); // Заполняем пустые индексы null
  //   }
  //   arr[index] = value; // Вставляем значение на нужный индекс
  // }

  const answerCreateArray = () => {
    dispatch(
      setAnswers({
        index: indicatorId,
        value: objInfoSelectedAnswer
      })
    )
  }

  return (
    <div className={css.questAndAnswers}>
      <p className={css.question} ref={focusBlock}>{qA[indicatorId].question}</p>
      {qA[indicatorId].answers.map((answer, id) => 
        <button 
          className={id === clickedId ? css.active : css.answer}
          onClick={()=>{
            setClickedId(id)

            /* формируем объект в выбраными ответами */
            objInfoSelectedAnswer.answerId = id
            objInfoSelectedAnswer.questionId = indicatorId
            objInfoSelectedAnswer.correct = answer.correct
            // console.log(objInfoSelectedAnswer);
            
            // answerArray[indicatorId] = objInfoSelectedAnswer
            // insertWithNulls(answerArray, indicatorId, objInfoSelectedAnswer);
            answerCreateArray()
            // console.log(answerArray);
          }}
          key={answer.id}
        >
          {answer.value}
        </button>
      )}
    </div>
  );
}

export default QuestAndAnswers;