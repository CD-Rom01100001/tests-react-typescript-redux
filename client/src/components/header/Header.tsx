import { FC } from 'react';
import { useDeviceType } from '../hooks/useDeviceType';
/* components */
import Label from './Label';
import Weather from './Weather';
import RegistrationButtons from './RegistrationButtons';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import IconUser from './IconUser';
import UserMenu from './UserMenu';
import Navigation from '../nav/Navigation';
/* redux */
import { useAppSelector } from '../../store/hooks';
/* css */
import css from './header.module.css'

const Header: FC = () => {
  const registrationWindowState = useAppSelector(state => state.registrationWindowIndex.registrationWindowState)
  const loginWindowState = useAppSelector(state => state.loginWindowReducerIndex.loginWindowState)
  const user = useAppSelector(state => state.userDataIndex.user)
  const isMobile = useDeviceType()// определяет ПК это или телефон

  return (
    <header className={css.header}>

      <div className={css.blockTop}>
        <Label/>
        <div className={css.userMenuWrapper}>
          {user && 
            <IconUser/>
          }
          <UserMenu />
        </div>
      </div>

      <div className={css.blockControl}>
        <RegistrationButtons/>
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

      {/* если открыто через мобильник */}
      {isMobile === 'mobile' && <Navigation/>}
      
    </header>
  );
}

export default Header;