import { FC } from 'react';
import css from './questionsSectionLink.module.css'
import { Link } from 'react-router-dom';

interface QuestionSectionLinkProps {
  link: string;
  name: string;
}

const QuestionSectionLink: FC<QuestionSectionLinkProps> = ({link, name}) => {

  return (
    <li className={css.questionSectionLink}>
      <Link to={link}>{name}</Link>
    </li>
  );
}

export default QuestionSectionLink;