import { FC } from 'react';
import css from './mainContent.module.css'
import QuestionsBlock from './QuestionsBlock/QuestionsBlock';
import TrainingBlock from './TrainingBlock/TrainingBlock';
import ExamBlock from './ExamBlock/ExamBlock';
import { Route, Routes } from 'react-router-dom';
import SectionQuestions from './QuestionsBlock/SectionsQuestions/SectionQuestions';
import OrderDownload from './QuestionsBlock/OrderDownload/OrderDownload';
import QuestionsList from './QuestionsBlock/QuestionsList/QuestionsList';

const MainContent: FC = () => {

  return (
    <div className={css.mainContent}>
      <Routes>
        <Route path='/' element={<>
          <QuestionsBlock/>
          <OrderDownload/>
          <QuestionsList/>
        </>}>
          <Route path='legalTraining80' element={<SectionQuestions/>}/>
        </Route>
        <Route path='/training' element={<TrainingBlock/>}/>
        <Route path='/exam' element={<ExamBlock/>}/>
      </Routes>
        
        {/* <QuestionsBlock/>
        <TrainingBlock/>
        <ExamBlock/> */}
    </div>
  );
}

export default MainContent;