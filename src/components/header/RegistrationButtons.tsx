import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registrationWindow, loginWindow } from '../../store/slices';
import { getUserDate } from '../../store/userSlice';
import { resetResultsData } from '../../store/setResultsSlice';

import css from './registrationButtons.module.css'
import '../../styles/themeStyles.css'

const RegistrationButtons: FC = () => {
  const theme = useAppSelector(state => state.themeIndex.themeSlice).toLocaleLowerCase();
  const user = useAppSelector(state => state.userDataIndex.user)
  const dispatch = useAppDispatch()
  const location = useLocation();
  const locationAdmin = location.pathname.startsWith('/settings');// проверка на соответствие шаблона адреса
  const locationModerator = location.pathname.startsWith('/users');// проверка на соответствие шаблона адреса

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('resultsTrainingData')
    localStorage.removeItem('resultsExamData')
    localStorage.removeItem('userList')
    dispatch(getUserDate(null))
    dispatch(resetResultsData())
  }

  return (
    <div className={css.registrationButtons}>
      {
      /* если пользователь авторизован и путь localhost:5173/settings или localhost:5173/users то кнопка "Выход" и ведет она себя как ссылка и ведет на главную страницу */
        user && locationAdmin || locationModerator ? 
        (
          <Link to="/" className={`${css.logIn} buttonDef ${theme}`} onClick={logout}>
            Выход
          </Link>
        ) : 
        /* если путь не localhost:5173/admin или не localhost:5173/users и пользователь авторизован то кнопка "Выход" и ведет она себя как обычно */
        user ? 
        (
          <button className={`${css.logIn} buttonDef ${theme}`} onClick={logout}>
            Выход
          </button>
        ) : 
        /* если пользователь не авторизован то кнопка "Вход" */
        (
          <button className={`${css.logIn} buttonDef ${theme}`} onClick={() => dispatch(loginWindow('open'))}>
            Вход
          </button>
        )
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