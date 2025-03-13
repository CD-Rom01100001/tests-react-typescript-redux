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
import {getAllStageLink} from './allStageLink'
import { getSectionAndNumber } from './sectionAndNumber';
import './app.css';

const questArray = Object.entries(contentQuest)

const App: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice);

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
            {getAllStageLink().map((elem, sectionId) => 
              <Route 
              path={`training/stage-${sectionId+1}`} 
              element={
                <TestTakingUnit 
                  title={sectionId+1} 
                  sectionNum={sectionId+1} 
                  numberOfQuestions={elem}
                  sectionAndNum={getSectionAndNumber(elem)}/>
              } 
              key={sectionId}>
                {elem.map((_, questId) => {
                  return <Route path={`${questId+1}`} element={<h1>{`${questId+1}`}</h1>} key={questId}/>
                })}
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
