import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeTheme } from '../../store/slices';
import css from './header.module.css'
import Label from './Label';
import ButtonTheme from './ButtonTheme';
import Weather from './Weather';
import RegistrationButtons from './RegistrationButtons';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const Header: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice);
  const registrationWindowState = useAppSelector(state => state.registrationWindowIndex.registrationWindowState)
  const loginWindowState = useAppSelector(state => state.loginWindowReducerIndex.loginWindowState)
  const dispatch = useAppDispatch();

  return (
    <header className={css.header}>

      <div className={css.blockTop}>
        <Label/>
        <RegistrationButtons/>
        <ButtonTheme theme={theme} active={()=>dispatch(changeTheme())} />
        <Weather/>
        {registrationWindowState === 'open' &&
          <RegistrationForm/>
        }
        {loginWindowState === 'open' && 
          <LoginForm/>
        }
      </div>

      <div className={css.blockTitle}>
        <h1 className={css.titleH1}>Обучение сотрудников ФГУП ГЦСС:</h1>
      </div>
      
    </header>
  );
}

export default Header;