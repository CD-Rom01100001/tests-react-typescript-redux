import { FC } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { getAllStageLink } from './allStageLink'
import { getSectionAndNumber } from './sectionAndNumber';
import { tenRandomQuestions } from './TenExamQuestion';
import QuestAndAnswers from './main/TestTakingUnit/QuestAndAnswers';

import './app.css';

const questArray = Object.entries(contentQuest)

const App: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice);

  // const url = 'http://localhost:5000/api/users/'
  // const getData = async () => {
  //   const response = await fetch(url)
  //   const data = await response.json()
  //   console.log(data);
  // }
  // getData()

  return (
    <BrowserRouter>
      <div className={`${'app'} ${theme.toLowerCase()}`}>
        
        <Routes>
          <Route path='/' element={<Layout/>}>
            {/* главная */}
            <Route index element={<Home/>}/>

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
                  numberOfQuestions={tenRandomQuestions()}
                  sectionAndNum={getSectionAndNumber(tenRandomQuestions())}/>
              } 
            />
            <Route  path='*' element={<NotFoundPage/>}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
