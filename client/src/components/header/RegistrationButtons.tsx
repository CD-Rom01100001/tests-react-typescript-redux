import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registrationWindow, loginWindow } from '../../store/slices';

import css from './registrationButtons.module.css'
import '../../styles/themeStyles.css'

const RegistrationButtons: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice).toLocaleLowerCase();
  const user = useAppSelector(state => state.userDataIndex.user)
  const dispatch = useAppDispatch()

  return (
    <div className={css.registrationButtons}>
      {/* если пользователь не авторизован то кнопка "Вход" и "Регистрация" */}
      {!user && 
        <>
          <button className={`${css.signIn} buttonDef ${theme}`} 
          onClick={()=>dispatch(registrationWindow('open'))}>
            Регистрация
          </button>
          <button className={`${css.logIn} buttonDef ${theme}`} 
          onClick={() => dispatch(loginWindow('open'))}>
            Вход
          </button>
        </>
      }

    </div>
  );
}

export default RegistrationButtons;