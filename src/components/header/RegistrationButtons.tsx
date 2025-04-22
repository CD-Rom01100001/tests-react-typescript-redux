import { FC } from 'react';
import css from './registrationButtons.module.css'
import { useAppDispatch } from '../../store/hooks';
import { openEntryWindow, registeredOrNot } from '../../store/slices';

const RegistrationButtons: FC = () => {

  const dispatch = useAppDispatch()

  return (
    <div className={css.registrationButtons}>
      <button className={css.logIn} 
        onClick={()=>{
          dispatch(registeredOrNot(false))
          dispatch(openEntryWindow(true))
        }}
      >
        Вход
      </button>
      <button className={css.signIn} 
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