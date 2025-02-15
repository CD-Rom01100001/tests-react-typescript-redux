import { FC } from 'react';
import css from './sectionQuestions.module.css'

// type AnswerType = {
//   section: string;
//   value: string;
//   correct: boolean,
//   id: string
// }

// type QuestType = {
//   question: string;
//   answers: AnswerType[]
// }

// type SectionQuestionsProps = {
//   title: string;
//   question: string;
//   answer: string;
// }

/* type SectionQuestionsProps = {
  i: number
} */

const SectionQuestions: FC/* <SectionQuestionsProps> */ = (/* {i} */) => {

  return (
    <div className={css.sectionQuestions}>
      <h3>{/* {i} */}Its work!!!</h3>
      {/* <h4>{question}</h4>
      <p>{answer}</p>
      <p>{answer}</p>
      <p>{answer}</p> */}
    </div>
  );
}

export default SectionQuestions;