import { FC } from 'react';
import css from './questionSectionBlock.module.css'

type AnswerT = {
  section: string;
  value: string;
  correct: boolean;
  id: string;
}

type QuestionT = {
  question: string;
  answers: AnswerT[]
}

interface QuestionSectionBlockProps {
  title: string;
  questions: QuestionT[]
}

const QuestionSectionBlock: FC<QuestionSectionBlockProps> = ({title, questions }) => {

  return (
    <div className={css.questionSectionBlock}>
      <div className={css.blockTitle}>
        <h3 className={css.title}>{`${title} (${questions.length})`}</h3>
      </div>

      {questions.map((qa, key) => 
        <div className={css.blockQuestions} key={key+1}>
          <p className={css.question} key={key+2}>{`${key+1}. ${qa.question}`}</p>
          <div className={css.blockAnswers} key={key+3}>
            {qa.answers.map(answer => 
              answer.correct === true ? 
              <p className={`${css.answer} ${css.answerCorrect}`} key={answer.id}>{answer.value}</p> :
              <p className={css.answer} key={answer.id}>{answer.value}</p>
            )}
          </div>
       </div>
       
      )}
     
    </div>
  );
}

export default QuestionSectionBlock;