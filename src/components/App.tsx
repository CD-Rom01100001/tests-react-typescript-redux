import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme } from '../store/slices';

import Label from './Label/Label';
import ButtonTheme from './ButtonTheme/ButtonTheme';
import BodyTests from './BodyTests/BodyTests';
import Weather from './Weather/Weather';
import './app.css';

const App: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice);
  const dispatch = useAppDispatch();

  return (
    <BrowserRouter>
      <div className={`${'app'} ${theme.toLowerCase()}`}>
        <div className="loadingBlock">
          
        </div>
        <div className={'topBlock'}>
          <Label/>
          <ButtonTheme theme={theme} active={()=>dispatch(changeTheme())} />
          <Weather/>
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
