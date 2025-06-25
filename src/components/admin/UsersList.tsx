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

  const sortedUsers = users.sort((a, b) => a.lastName.localeCompare(b.lastName));

  console.log(users)
  console.log(sortedUsers)

  return (
    <div className={css.usersList}>
      <h2>Список пользователей</h2>
      {loading &&
        <p>Ожидает загрузку пользователей...</p>
      }
      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Email</th>
            <th>Статус</th>
            <th>Обучение</th>
            <th>Экзамен</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user._id}>
                <td>{`${user.lastName} ${user.firstName[0]}.${user.middleName[0]}.`}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>{user.role}</td>
                <td>{user.resultsTrainingData.bestResult.map((result, index) => 
                  <p className={css.resultText} key={index}>
                    {`${user.resultsTrainingData.openPreview[index]}-й этап: `}
                    <span className={css.result}>{result}</span>
                  </p>
                )}</td>
                <td>{user.resultsExamData.map((result, index) => 
                  <p className={css.resultText} key={index}>{result}</p>
                )}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button className='buttonDef' onClick={updateUserData}>Обновить</button>
    </div>
  );
}

export default UsersList;