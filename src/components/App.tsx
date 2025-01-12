import { FC } from 'react'

import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { changeTheme } from '../store/themeSlice';

import Label from './Label/Label';
import ButtonTheme from './ButtonTheme/ButtonTheme';
import './app.css';
import BodyTests from './BodyTests/BodyTests';
import { BrowserRouter } from 'react-router-dom';

const App: FC = () => {
  const theme = useSelector(state => state.themeIndex.themeSlice);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div className={`${'app'} ${theme.toLowerCase()}`}>
        <div className={'topBlock'}>
          <Label/>
          <ButtonTheme theme={theme} active={()=>dispatch(changeTheme())} />
        </div>
        <div className={'app__block_title'}>
          <h1 className={'titleH1'}>Обучение сотрудников ФГУП ГЦСС:</h1>
        </div>
        <BodyTests/>
        
      </div>
    </BrowserRouter>
  )
}

export default App
