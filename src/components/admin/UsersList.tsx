import { FC, useState, useEffect } from 'react';
import { getUsers, User } from '../../api/usersApi';
import css from './UsersList.module.css'

const UsersList: FC = () => {

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cachedUsers = localStorage.getItem('userList')
    const loadUsersList = async () => {
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers))
        setLoading(false)
      } else {
        try {
          const usersList = await getUsers()
          localStorage.setItem('userList', JSON.stringify(usersList))
          setUsers(usersList)
          setLoading(false)
        } catch (error) {
          console.error('Ошибка при загрузке пользователей:', error)
          alert('Ошибка при загрузке пользователей!')
          setLoading(false)
        }
      }
    }
    loadUsersList()
  }, [])

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
    <div className={css.usersList}>
      <h2>Список пользователей</h2>
      {loading &&
        <p>Ожидает загрузку пользователей...</p>
      }
      {users.map(user => {
        return (
          <div className={css.user} key={user._id}>
            <p>{user.lastName}</p>
            <p>{user.firstName}</p>
            <p>{user.middleName}</p>
          </div>
        )
      })}
      <button onClick={updateUserData}>Обновить</button>
    </div>
  );
}

export default UsersList;