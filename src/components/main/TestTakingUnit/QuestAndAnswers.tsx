import { FC } from 'react';
import { AllQAT } from '../../allStageLink'
import css from './questAndAnswers.module.css'

interface QuestAndAnswersProps {
  QA: AllQAT
}

const QuestAndAnswers: FC<QuestAndAnswersProps> = ({QA}) => {

  return (
    <div className={css.questAndAnswers}>
      <p className={css.question}>{QA.question}</p>
      <ul>
        {QA.answers.map(answer => 
          <li className={css.answer} key={answer.id}>{answer.value}</li>
        )}
      </ul>
    </div>
  );
}

export default QuestAndAnswers;