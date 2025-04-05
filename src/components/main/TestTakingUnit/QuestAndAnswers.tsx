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

  /* при открытии тестов, центр старницы смещается к блоку с вопросом */
  useEffect(() => {
    if(focusBlock.current) {
      focusBlock.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  /* redux */
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const arrayAnswersSlice = useAppSelector(state => state.arrayAnswersIndex.arrayAnswers)
  const dispatch = useAppDispatch()

  /* states */
  // const [clickedId, setClickedId] = useState<number|null>(null)
  const focusBlock = useRef<HTMLDivElement>(null)

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

  // useEffect(() => {
  //   dispatch(
  //     initAnswers(new Array(qA.length).fill(null))
  //   )
  // }, [qA])

  return (
    <div className={css.questAndAnswers}>
      <p className={css.question} ref={focusBlock}>{qA[indicatorId]?.question}</p>
      {qA[indicatorId]?.answers.map((answer, id) => {
        const suffled = arrayAnswersSlice[indicatorId]?.answerId === id
        return (<button 
          className={`${css.answer} ${suffled ? css.active : css.answer}`}
          onClick={()=>{
            // setClickedId(id)

            /* формируем объект в выбраными ответами */
            objInfoSelectedAnswer.answerId = id
            objInfoSelectedAnswer.questionId = indicatorId
            objInfoSelectedAnswer.correct = answer.correct
            console.log(objInfoSelectedAnswer);

            /* помещает объект в массив */
            answerCreateArray()
            console.log(arrayAnswersSlice);
          }}
          key={answer.id}
        >
          {answer.value}
        </button>)
      })}
    </div>
  );
}

export default QuestAndAnswers;