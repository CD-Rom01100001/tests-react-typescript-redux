import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeTheme } from '../../store/slices';
import css from './header.module.css'
import Label from './Label';
import ButtonTheme from './ButtonTheme';
import Weather from './Weather';

const Header: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice);
  const dispatch = useAppDispatch();

  return (
    <header className={css.header}>

      <div className={css.blockTop}>
        <Label/>
        <ButtonTheme theme={theme} active={()=>dispatch(changeTheme())} />
        <Weather/>
      </div>

      <div className={css.blockTitle}>
        <h1 className={css.titleH1}>Обучение сотрудников ФГУП ГЦСС:</h1>
      </div>
      
    </header>
  );
}

export default Header;