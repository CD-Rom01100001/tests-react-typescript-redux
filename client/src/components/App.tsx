import { FC, useEffect, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllStageLink } from './allStageLink'
import { getSectionAndNumber } from './sectionAndNumber';
import { tenRandomQuestions } from './TenExamQuestion';
import { TrainingMaterialsData } from '../data/trainingMaterials/trainingMaterialsData';
import { useDeviceType } from './hooks/useDeviceType';
import { setStateUserWindow } from '../store/userWindowSlice';

import contentQuest from '../data/allQuestions.json'
import LayoutPC from './main/LayoutPC/LayoutPC';
import LayoutMobile from './main/LayoutMobile/LayoutMobile';
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
import DescriptionOrganization from './main/DescriptionOrganization/DescriptionOrganization';
import Header from './header/Header';

import './app.css';
import '../styles/themeStyles.css'

const questArray = Object.entries(contentQuest)

const App: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice)
  const userWindowState = useAppSelector(state => state.userWindow.window)
  const dispatch = useAppDispatch()
  const randomQuestions = useMemo(() => tenRandomQuestions(), [])
  const isMobile = useDeviceType()// определяет ПК это или телефон

  const definesTeplateOfRoutes = () => {

    const setComponent = <T extends React.ReactElement>(par1: T, par2: T) => isMobile === 'PC' ? par1 : par2

    return <Routes>
      <Route path='/' element={setComponent(<LayoutPC/>, <LayoutMobile/>)}>
        
        <Route index element={setComponent(<DescriptionOrganization/>, <Header/>)}/>

        {isMobile === 'mobile' && <Route path='home' element={<DescriptionOrganization/>}/>}

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

        {isMobile === 'PC' ?
          /* блок "Учебные материалы" для ПК */
          <Route  path='training-materials' element={<TrainingMaterials/>}>
            {TrainingMaterialsData.map((section, i) => {
              return <Route path={section.path} element={<MaterialDescription title={section.title} data={section.data} />} key={i} />
            })}
          </Route> 
          : 
          /* блок "Учебные материалы" для мобильных */
          <>
            <Route  path='training-materials' element={<TrainingMaterials/>}/>
            {TrainingMaterialsData.map((section, i) => {
              console.log(section.path)
              return <Route 
                path={`training-materials/${section.path}`} 
                element={<MaterialDescription title={section.title} 
                data={section.data} />} key={i} />
            })}
          </>
        }

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
  }

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

      {/*  */}
      <div 
        className={userWindowState ? 'close-user-menu-wrapper' : ''} 
        onClick={()=>dispatch(setStateUserWindow())}></div>

      {/*  */}
      <div className={`${'app'} ${theme.toLowerCase()}-theme`}>
        {/* окно предупреждения */}
        {/* {alert === 'open' ? openAlert() : ''} */}

        {definesTeplateOfRoutes()}

      </div>

    </BrowserRouter>
  )
}

export default App

// https://chatgpt.com/c/68974d30-92e8-8324-9822-68d4a0d83b6f