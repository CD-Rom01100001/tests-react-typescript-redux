import { FC, useState } from 'react';

import { getUsers, User } from '../../api/usersApi';
import css from './Admin.module.css'
import UserTable from './UserTable';

const Admin: FC = () => {
  const [users, setUsers] = useState<User[]>([])// список пользователей из locslStorage
  const [loading, setLoading] = useState(true)// загрузка

  /* получить актуальный список пользователей как на сервере */
  const updateUserData = () => {
    setLoading(true)
    getUsers()
      .then((data) => {
        setUsers(data)
        localStorage.setItem('userList', JSON.stringify(data))
        setLoading(false)
      })
      .catch((error) => {
        console.error('Ошибка при загрузке пользователей:', error)
        alert('Ошибка при загрузке пользователей!')
        setLoading(false)
      })
  }

  return (
    <div className={css.admin}>
      <h2 className={css.adminTitle}>Панель администратора</h2>
      {loading &&
        <p>Ожидает загрузку пользователей...</p>
      }
      <div className={css.tableWrapper}>
        <UserTable users={users} setUsers={setUsers} setLoading={setLoading}/>
      </div>
      <button className='buttonDef' onClick={updateUserData}>Обновить</button>
    </div>
  );
}

export default Admin;

