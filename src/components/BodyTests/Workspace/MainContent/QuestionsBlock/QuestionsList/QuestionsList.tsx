import { FC } from 'react';
import css from './questionsList.module.css'
import { NavLink } from 'react-router-dom';

type QuestionsListProps = {
  sectionName: string;
  sectionLink: string;
}
type ActiveType = {
  isActive: boolean
}

const QuestionsList: FC/* <QuestionsListProps> */ = (/* {sectionName, sectionLink} */) => {
  
  const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';
  /* console.log(sectionLink); */
  return (
    <>
    <NavLink to='/questions'>dddddddd</NavLink>
    {/* <li className={css.sectionName}>
      <NavLink 
        className={setActive} 
        to={`/${sectionLink}`}
      >
        {`${sectionName} (${sectionLink.replace(/\D/g, "")})`}
      </NavLink>
    </li> */}
    </>
    
  );
}

export default QuestionsList;