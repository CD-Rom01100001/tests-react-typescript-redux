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

const QuestAndAnswers: FC<QuestAndAnswersProps> = ({qA}) => {
  /* redux */
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const arrayAnswers = useAppSelector(state => state.arrayAnswersIndex.arrayAnswers)
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
      {qA[indicatorId].answers.map((answer, id) => {
        return (
          <button 
            className={`${css.answer} ${clickedId === id ? css.active : ''}`}
            onClick={()=>{
              setClickedId(id)

              /* формируем объект в выбраными ответами */
              objInfoSelectedAnswer.answerId = id
              objInfoSelectedAnswer.questionId = indicatorId
              objInfoSelectedAnswer.correct = answer.correct
              console.log(objInfoSelectedAnswer);

              answerCreateArray()
              // console.log(answerArray);
            }}
            key={answer.id}
          >
            {answer.value}
          </button>
      )})}
    </div>
  );
}

export default QuestAndAnswers;