import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Description from './Description/Description';
import QuestionsBlock from './MainContent/QuestionsBlock/QuestionsBlock';
import descriptionsData from '../../../data/descriptions.json'

import css from './workSpace.module.css'

const WorkSpace: FC = () => {

  return (
    <div className={css.workSpace}>
      <Routes>
        <Route index element={
          <div>
            <Description data={descriptionsData.questions} />
            <QuestionsBlock/>
          </div>
        }/>
        <Route 
          path='/training' 
          element={<Description data={descriptionsData.training}/>}/>
        <Route 
          path='/exam' 
          element={<Description data={descriptionsData.exam}/>}/>
      </Routes>
    </div>
  );
}

export default WorkSpace;