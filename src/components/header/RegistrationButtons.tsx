import { FC } from 'react';
import css from './registrationButtons.module.css'
import { useAppDispatch } from '../../store/hooks';
import { registeredOrNot } from '../../store/slices';

const RegistrationButtons: FC = () => {

  const dispatch = useAppDispatch()

  return (
    <div className={css.registrationButtons}>
      <button className={css.logIn} onClick={()=>dispatch(registeredOrNot(false))}>Вход</button>
      <button className={css.signIn} onClick={()=>dispatch(registeredOrNot(true))}>Регистрация</button>
    </div>
  );
}

export default RegistrationButtons;