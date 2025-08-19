import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom'
import HistoryExam from './HistoryExam';
import { useAppSelector } from '../../../store/hooks';
import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import css from './exam.module.css'


const Exam: FC = () => {
  const resultsExamDataLS = localStorage.getItem('resultsExamData')
  const userDataState = useAppSelector(state => state.userDataIndex.user)// меняет состояние превьюшек в зависимости от того залогинен пользователь или нет
  
  useEffect(() => {
  }, [userDataState])
  

  return (
    <div className={css.exam}>

      <Link to='/' className='btnBackMobile buttonDef'>&lt;</Link>

      <Description 
      title={contentDescr.exam.title} 
      description={contentDescr.exam.description}/>

      <div className={css.historyExamBlock}>
        <h3 className={css.historyTitle}>История экзаменов:</h3>
        {resultsExamDataLS ?
          <HistoryExam data={JSON.parse(resultsExamDataLS)}/> :
          <p className={css.alert}>История пуста!</p>
        }
      </div>
      
      <div className={css.buttonBlock}>
        <Link to={`/exam/test`} className={css.examTestButton}>
          Начать экзамен
        </Link>
      </div>
    </div>
  );
}

export default Exam;