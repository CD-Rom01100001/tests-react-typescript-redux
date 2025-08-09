import { FC, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllStageLink } from './allStageLink'
import { getSectionAndNumber } from './sectionAndNumber';
import { tenRandomQuestions } from './TenExamQuestion';
import { TrainingMaterialsData } from '../data/trainingMaterials/trainingMaterialsData';
import { useWindowWidth } from './hooks/useWindowWidth';

import contentQuest from '../data/allQuestions.json'
import Layout from './Layout';
import Home from './main/home/Home';
import Questions from './main/questions/Questions';
import QuestionSectionBlock from './main/questions/QuestionSectionBlock';
import Training from './main/training/Training';
import Exam from './main/exam/Exam';
import NotFoundPage from './NotFoundPage';
import TestTakingUnit from './main/TestTakingUnit/TestTakingUnit';
import Admin from './admin/Admin';
import UsersList from './admin/UsersList';
import TrainingMaterials from './main/trainingMaterials/TrainingMaterials';
import MaterialDescription from './main/trainingMaterials/MaterialDescription';

import './app.css';
import '../styles/themeStyles.css'
import { setStateUserWindow } from '../store/userWindowSlice';
import Navigation from './nav/Navigation';

const questArray = Object.entries(contentQuest)

// const ResponsiveLayout: FC = () => {
//   const width = useWindowWidth()
//   return width > 800 ? <Layout><Outlet /></Layout> : <Outlet />
// };

const App: FC = () => {
  /* test commit */
  const theme = useAppSelector(state => state.themeIndex.themeSlice);
  const userWindowState = useAppSelector(state => state.userWindow.window)
  const dispatch = useAppDispatch()
  const randomQuestions = useMemo(() => tenRandomQuestions(), [])

  useEffect(() => {
    if (theme === 'Light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]); // сработает при изменении theme

  return (
    <BrowserRouter>
      <div 
        className={userWindowState ? 'close-user-menu-wrapper' : ''} 
        onClick={()=>dispatch(setStateUserWindow())}></div>
      <div className={`${'app'} ${theme.toLowerCase()}-theme`}>
        {/* окно предупреждения */}
        {/* {alert === 'open' ? openAlert() : ''} */}

        <Routes>
          <Route path='/' element={<Layout/>}>//!

            {/* {useWindowWidth() > 800 ? 
            <Route index element={<Home/>}/> :
            <>
            <Route index element={<Navigation/>}/>
            <Route path='/' element={<Home/>}/>
            </>
            } */}
            {/* главная */}

            <Route index element={<Home/>}/>//!

            {/* блок "Вопросы" */}
            <Route  path='questions' element={<Questions/>}>
              {questArray.map((array, i) => 
                <Route path={array[0]} 
                  element={
                    <QuestionSectionBlock 
                      title={array[1][0].answers[0].section}
                      questions={array[1].map(question => question)}
                    />} 
                key={i}/>
              )}
            </Route>

            {/* блок "Учебные материалы" */}
            <Route  path='training-materials' element={<TrainingMaterials/>}>
              {TrainingMaterialsData.map((section, i) => {
                return <Route path={section.path} element={<MaterialDescription title={section.title} data={section.data} />} key={i} />
              })}
            </Route>

            {/* блок "Обучение" */}
            <Route  path='training' element={<Training/>}/>

            {/* блок прохождения тестов */}
            {getAllStageLink().map((elem, sectionId) => {
            return <Route  
              path={`training/stage-${sectionId+1}`} 
              element={
                <TestTakingUnit 
                  title={'Обучение'}
                  stageNumber={sectionId+1}
                  numberOfQuestions={elem}
                  sectionAndNum={getSectionAndNumber(elem)}/>
              } 
              key={sectionId}
            />})}
            <Route path='exam' element={<Exam/>}/>
            <Route  
              path={`exam/test`} 
              element={
                <TestTakingUnit 
                  title={'Экзамен'}
                  numberOfQuestions={randomQuestions}
                  sectionAndNum={getSectionAndNumber(randomQuestions)}/>
              } 
            />

            {/* Панель настроек */}
            <Route  path='settings' element={<Admin/>}/>

            {/* Список зарегестрированных пользователей */}
            <Route  path='users' element={<UsersList/>}/>

            <Route  path='*' element={<NotFoundPage/>}></Route>
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
