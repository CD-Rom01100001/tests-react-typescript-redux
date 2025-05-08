import { FC } from 'react';
import { Link } from 'react-router-dom'
import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import css from './exam.module.css'
import HistoryExam from './HistoryExam';
import { useAppSelector } from '../../../store/hooks';

const Exam: FC = () => {
  const resultsExamDataLS = localStorage.getItem('resultsExamData')
  const resultsExamDataState = useAppSelector(state => state.resultsDataIndex.resultsExamData)

  return (
    <div className={css.exam}>
      <Description 
      title={contentDescr.exam.title} 
      description={contentDescr.exam.description}/>

      {resultsExamDataLS &&
        <HistoryExam data={JSON.parse(resultsExamDataLS)}/>
        // <HistoryExam data={resultsExamDataState}/>
      }
      
      <div className={css.buttonBlock}>
        <Link to={`/exam/test`} className={css.examTestButton}>
          Начать экзамен
        </Link>
      </div>
    </div>
  );
}

export default Exam;