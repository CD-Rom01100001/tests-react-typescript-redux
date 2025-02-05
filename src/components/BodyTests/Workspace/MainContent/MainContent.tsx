import { FC } from 'react';
import css from './mainContent.module.css'
import QuestionsBlock from './QuestionsBlock/QuestionsBlock';
import { Routes, Route } from 'react-router-dom';
import TrainingBlock from './TrainingBlock/TrainingBlock';
import ExamBlock from './ExamBlock/ExamBlock';

const MainContent: FC = () => {

  return (
    <div className={css.mainContent}>
      <Routes>
        <Route index element={<QuestionsBlock/>}/>
        <Route path='/training' element={<TrainingBlock/>}/>
        <Route path='/exam' element={<ExamBlock/>}/>
      </Routes>
    </div>
  );
}

export default MainContent;