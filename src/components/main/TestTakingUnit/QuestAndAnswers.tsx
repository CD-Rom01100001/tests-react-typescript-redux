import { FC, SetStateAction, useState } from 'react';
import { AllQAT } from '../../allStageLink'
import css from './questAndAnswers.module.css'
import { useAppSelector } from '../../../store/hooks';

interface QuestAndAnswersProps {
  QA: AllQAT
}
type ObjInfoSelectedAnswerType = {
  questionId: number | null;
  answerId: number | null;
  correct: boolean | null;
}
const answerArray: ObjInfoSelectedAnswerType[] = []

const QuestAndAnswers: FC<QuestAndAnswersProps> = ({QA}) => {
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const [clickedId, setClickedId] = useState<null | number>(null)

  const objInfoSelectedAnswer: ObjInfoSelectedAnswerType = {
    questionId: null,
    answerId: null,
    correct: null,
  }

  return (
    <div className={css.questAndAnswers}>
      <p className={css.question}>{QA.question}</p>
      {QA.answers.map((answer, id) => 
        <button 
          className={id === clickedId ? css.active : css.answer}
          name={`${id}`}
          onClick={(event)=>{
            setClickedId(Number(event.currentTarget.name))
            objInfoSelectedAnswer.answerId = Number(event.currentTarget.name)
            objInfoSelectedAnswer.questionId = indicatorId
            objInfoSelectedAnswer.correct = answer.correct
            answerArray[indicatorId] = objInfoSelectedAnswer;
            
            console.log(indicatorId + ' + ' + event.currentTarget.name);
            console.log(objInfoSelectedAnswer);
            console.log(answerArray);
            console.log(objInfoSelectedAnswer.answerId);
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