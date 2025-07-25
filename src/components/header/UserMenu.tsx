import { FC } from 'react';
import { Link } from 'react-router-dom';

/* redux */
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getUserDate } from '../../store/userSlice';
import { resetResultsData } from '../../store/setResultsSlice';
import { setStateUserWindow } from '../../store/userWindowSlice';

/* css */
import css from './UserMenu.module.css'

const UserMenu: FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userDataIndex.user)
  const userDate = useAppSelector(state => state.userDataIndex.user)
  const userWindowState = useAppSelector(state => state.userWindow.window)
  const theme = useAppSelector(state => state.themeIndex.themeSlice).toLocaleLowerCase();
  const locationAdmin = location.pathname.startsWith('/settings');// проверка на соответствие шаблона адреса
  const locationModerator = location.pathname.startsWith('/users');// проверка на соответствие шаблона адреса

  const convertRoleToText = () => {
    switch (userDate?.role) {
      case 'user':
        return 'пользователь';
      case 'moderator':
        return 'модератор';
      case 'admin':
        return 'администратор'
      default:
        return 'неизвестно'
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('resultsTrainingData')
    localStorage.removeItem('resultsExamData')
    localStorage.removeItem('userList')
    dispatch(getUserDate(null))
    dispatch(resetResultsData())
    dispatch(setStateUserWindow())
  }

  return (
    <div className={`${css.userMenu} ${userWindowState ? css.active : ''}`}>
      <div className={css.fioBlock}>
        <h3>ФИО</h3>
        <p>{userDate?.lastName}</p>
        <p>{userDate?.firstName}</p>
        <p>{userDate?.middleName}</p>
      </div>

      <div className={css.infoBlock}>
        <h3>Информация</h3>
        <p>email: {userDate?.email}</p>
        <p>статус: {convertRoleToText()}</p>
      </div>

      <div className={css.blockButton}>
        {
            /* если пользователь авторизован и путь localhost:5173/settings или localhost:5173/users то кнопка "Выход" и ведет она себя как ссылка и ведет на главную страницу */
          user && locationAdmin || locationModerator ? 
          (
            <Link to="/" className={`${css.logIn} buttonDef ${theme}`} onClick={logout}>
              Выход
            </Link>
          ) : 
          /* если путь не localhost:5173/admin или не localhost:5173/users и пользователь авторизован то кнопка "Выход" и ведет она себя как обычно */
          (
            <button className={`${css.logIn} buttonDef ${theme}`} onClick={logout}>
              Выход
            </button>
          )
        }
      </div>
    </div>
  );
}

export default UserMenu;