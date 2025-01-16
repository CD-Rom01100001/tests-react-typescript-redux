import { FC } from 'react';
import css from './questionsList.module.css'

type QuestionsListProps = {
  sectionName: string
}

const QuestionsList: FC<QuestionsListProps> = ({sectionName}) => {

  return (
    <li className={css.sectionName}>
      <a href="">{sectionName}</a>
    </li>
  );
}

export default QuestionsList;