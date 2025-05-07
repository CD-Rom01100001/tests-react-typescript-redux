import { FC } from 'react';
import { Link } from 'react-router-dom'
import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import css from './exam.module.css'
import HistoryExam from './HistoryExam';

const Exam: FC = () => {
  const resultsExamData = localStorage.getItem('resultsExamData')

  return (
    <div className={css.exam}>
      <Description 
      title={contentDescr.exam.title} 
      description={contentDescr.exam.description}/>

      {resultsExamData &&
      <HistoryExam data={JSON.parse(resultsExamData)}/>}
      
      <div className={css.buttonBlock}>
        <Link to={`/exam/test`} className={css.examTestButton}>
          Начать экзамен
        </Link>
      </div>
    </div>
  );
}

export default Exam;