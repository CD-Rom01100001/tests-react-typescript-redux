import { FC } from 'react';
import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import css from './exam.module.css'

const Exam: FC = () => {

  return (
    <div className={css.exam}>
      <Description 
      title={contentDescr.exam.title} 
      description={contentDescr.exam.description}/>

      .
    </div>
  );
}

export default Exam;