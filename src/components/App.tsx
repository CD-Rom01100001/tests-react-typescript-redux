import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

import Layout from './Layout';
import Questions from './main/questions/Questions';
import Training from './main/training/Training';
import Exam from './main/exam/Exam';
import NotFoundPage from './NotFoundPage';

import './app.css';

const App: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice);

  return (
    <BrowserRouter>
      <div className={`${'app'} ${theme.toLowerCase()}`}>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Questions/>}></Route>
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
