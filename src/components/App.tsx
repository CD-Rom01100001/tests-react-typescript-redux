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

import './app.css';

// const array1 = Object.keys(contentQuest)
// const array2 = Object.values(contentQuest)
const questArray = Object.entries(contentQuest)
console.log(questArray);

// const path = array3.map(elem => elem[0])
// console.log(path);

// const title = array3.map(elem => elem[1][0].answers[0].section)
// console.log(title);

// const question = array3.map(elem => elem[1].map(inElem => inElem.question))
// console.log(question);

// const answers = array3.map(elem => elem[1].map(inElem => inElem))
// console.log(answers);

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
            <Route path='training' element={<Training/>}></Route>
            <Route path='exam' element={<Exam/>}></Route>
            <Route path='*' element={<NotFoundPage/>}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
