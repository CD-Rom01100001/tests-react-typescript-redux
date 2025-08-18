import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom'
import HistoryExam from './HistoryExam';
import { useAppSelector } from '../../../store/hooks';
import contentDescr from '../../../data/descriptions.json'
import { useDeviceType } from '../../hooks/useDeviceType';
import Description from '../Description';
import css from './exam.module.css'


const Exam: FC = () => {
  const resultsExamDataLS = localStorage.getItem('resultsExamData')
  const userDataState = useAppSelector(state => state.userDataIndex.user)// меняет состояние превьюшек в зависимости от того залогинен пользователь или нет
  const isMobile = useDeviceType()
  
  useEffect(() => {
  }, [userDataState])
  

  return (
    <div className={css.exam}>
      
      {isMobile === 'mobile' && 
        <Link to='/' className='buttonBack buttonDef'>&lt;</Link>
      }

      <Description 
      title={contentDescr.exam.title} 
      description={contentDescr.exam.description}/>

      <div className={css.historyExamBlock}>
        <h3>История экзаменов:</h3>
        {resultsExamDataLS &&
          <HistoryExam data={JSON.parse(resultsExamDataLS)}/>
          // <HistoryExam data={resultsExamDataState}/>
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