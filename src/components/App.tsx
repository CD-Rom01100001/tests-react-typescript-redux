import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import contentQuest from '../data/allQuestions.json'

import Layout from './Layout';
import Home from './main/home/Home';
import Questions from './main/questions/Questions';
import QuestionSectionBlock from './main/questions/QuestionSectionBlock';
import Training from './main/training/Training';
import Exam from './main/exam/Exam';
import NotFoundPage from './NotFoundPage';
import TestTakingUnit from './main/TestTakingUnit/TestTakingUnit';
import './app.css';

const questArray = Object.entries(contentQuest)

const App: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice);
  // const idStage = useAppSelector(state => state.idStageIndex.idStageSlice)
  const idStage = Math.ceil(Object.entries(contentQuest).map(arr=>arr[1].length).reduce((x,y)=>x+y,0)/35)

  return (
    <BrowserRouter>
      <div className={`${'app'} ${theme.toLowerCase()}`}>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='questions' element={<Questions/>}>
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
            <Route path='training' element={<Training/>}/>
            {Array.from({length: idStage}, (_, i) => 
              <Route path={`training/stage-${i+1}`} element={<TestTakingUnit title={`stage ${i+1}`}/>} key={i}>
                <Route path={`1`} element={<h1>1</h1>}/>
              </Route>
            )}
            <Route path='exam' element={<Exam/>}></Route>
            <Route path='*' element={<NotFoundPage/>}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
