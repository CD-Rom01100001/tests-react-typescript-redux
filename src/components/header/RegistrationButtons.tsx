import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registrationWindow, loginWindow } from '../../store/slices';
import { getUserDate } from '../../store/userSlice';

import css from './registrationButtons.module.css'
import '../../styles/themeStyles.css'

const RegistrationButtons: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice).toLocaleLowerCase();
  const user = useAppSelector(state => state.userDataIndex.user)
  const dispatch = useAppDispatch()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('resultsTrainingDataServer')
    localStorage.removeItem('resultsExamDataServer')
    dispatch(getUserDate(null))
  }

  return (
    <div className={css.registrationButtons}>
      {!user ? 
        <button className={`${css.logIn} buttonDef ${theme}`} 
        onClick={()=>{
          dispatch(loginWindow('open'))
          console.log(user)
        }}
        >
          Вход
        </button> :
        <button className={`${css.logIn} buttonDef ${theme}`} 
        onClick={logout} >
          Выход
        </button>
      }
      {!user && 
        <button className={`${css.signIn} buttonDef ${theme}`} 
        onClick={()=>dispatch(registrationWindow('open'))}
        >
          Регистрация
        </button>
      }

    </div>
  );
}

export default RegistrationButtons;