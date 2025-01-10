import { FC } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { changeTheme } from '../store/themeSlice';
import './app.css';
import Label from './Label/Label';
import ButtonTheme from './ButtonTheme/ButtonTheme';

const App: FC = () => {
  const theme = useSelector(state => state.themeIndex.themeSlice);
  const dispatch = useDispatch();

  return (
    <div className={`${'app'} ${theme.toLowerCase()}`}>
      <div className={'topBlock'}>
        <Label/>
        <ButtonTheme theme={theme} active={()=>dispatch(changeTheme())} />
      </div>
      <div className={'app__block_title'}>
        <h1 className={'titleH1'}>Обучение сотрудников ФГУП ГЦСС:</h1>
      </div>
      
    </div>
  )
}

export default App
