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
  question: QuestionT[]
  // answer1: string;
  // answer2: string;
  // answer3: string;
}

const QuestionSectionBlock: FC<QuestionSectionBlockProps> = ({title, question/* , answer1, answer2, answer3 */}) => {

  console.log(question);

  return (
    <div className={css.questionSectionBlock}>
      <div className={css.blockTitle}>
        <h3 className={css.title}>{title}</h3>
      </div>

      {question.map((qa, key) => 
        <div className={css.blockQuestions} key={key+1}>
          <p className={css.question} key={key+2}>{qa.question}</p>
          <div className={css.blockAnswers} key={key+3}>
            {qa.answers.map(answer => 
              <p className={css.answer} key={answer.id}>{answer.value}</p>
            )}
          </div>
       </div>
       
      )}
     
    </div>
  );
}

export default QuestionSectionBlock;