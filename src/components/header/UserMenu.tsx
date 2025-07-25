import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import css from './UserMenu.module.css'

const UserMenu: FC = () => {
  const userDate = useAppSelector(state => state.userDataIndex.user)
  const userWindowState = useAppSelector(state => state.userWindow.window)

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



  return (
    <div className={`${css.userMenu} ${userWindowState ? css.active : ''}`}>
      <h3>ФИО</h3>
      <p>{userDate?.lastName}</p>
      <p>{userDate?.firstName}</p>
      <p>{userDate?.middleName}</p>

      <h3 style={{marginTop: '2rem'}}>Информация</h3>
      <p>email: {userDate?.email}</p>
      <p>статус: {convertRoleToText()}</p>
    </div>
  );
}

export default UserMenu;