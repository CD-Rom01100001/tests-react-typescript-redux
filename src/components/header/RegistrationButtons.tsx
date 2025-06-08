import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openEntryWindow, registeredOrNot } from '../../store/slices';

import css from './registrationButtons.module.css'
import '../../styles/themeStyles.css'

const RegistrationButtons: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice).toLocaleLowerCase();

  const dispatch = useAppDispatch()

  return (
    <div className={css.registrationButtons}>
      <button className={`${css.logIn} buttonDef ${theme}`} 
        onClick={()=>{
          dispatch(registeredOrNot(false))
          dispatch(openEntryWindow(true))
        }}
      >
        Вход
      </button>
      <button className={`${css.signIn} buttonDef ${theme}`} 
        onClick={()=>{
          dispatch(registeredOrNot(true))
          dispatch(openEntryWindow(true))
        }}
      >
        Регистрация
      </button>
    </div>
  );
}

export default RegistrationButtons;