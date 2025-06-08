import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeTheme } from '../../store/slices';
import css from './header.module.css'
import Label from './Label';
import ButtonTheme from './ButtonTheme';
import Weather from './Weather';
import RegistrationButtons from './RegistrationButtons';
import RegistrationForm from './RegistrationForm';

const Header: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice);
  const registrationWindow = useAppSelector(state => state.registeredOrNotIndex.openWindow)
  const dispatch = useAppDispatch();
  console.log(theme)

  return (
    <header className={css.header}>

      <div className={css.blockTop}>
        <Label/>
        <RegistrationButtons/>
        <ButtonTheme theme={theme} active={()=>dispatch(changeTheme())} />
        <Weather/>
        {registrationWindow &&
          <RegistrationForm/>
        }
      </div>

      <div className={css.blockTitle}>
        <h1 className={css.titleH1}>Обучение сотрудников ФГУП ГЦСС:</h1>
      </div>
      
    </header>
  );
}

export default Header;