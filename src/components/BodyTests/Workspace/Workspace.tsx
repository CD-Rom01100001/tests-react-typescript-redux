import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Description from './Description/Description';
import MainContent from './MainContent/MainContent';
import descriptionsData from '../../../data/descriptions.json'

import css from './workSpace.module.css'

const WorkSpace: FC = () => {

  return (
    <div className={css.workSpace}>
      {/* ----- Descriptions ----- */}
      <Routes>
        <Route index element={<Description data={descriptionsData.questions}/>}/>
        <Route path='/training' element={<Description data={descriptionsData.training}/>}/>
        <Route path='/exam' element={<Description data={descriptionsData.exam}/>}/>
      </Routes>
      {/* ----- MainContent ----- */}
      <MainContent/>
    </div>
  );
}

export default WorkSpace;