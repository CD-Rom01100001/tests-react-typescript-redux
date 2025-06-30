import { FC, useState, useEffect } from 'react';
import { RiDeleteBin2Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { getUsers, User } from '../../api/usersApi';
import css from './Admin.module.css'

const Admin: FC = () => {
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

  return (
    <div className={css.admin}>
      <h2 className={css.adminTitle}>Панель администратора</h2>
      {loading &&
        <p>Ожидает загрузку пользователей...</p>
      }
      <div className={css.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Email</th>
              <th>Статус</th>
              <th>Обучение</th>
              <th>Экзамен</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(user => {
              return (
                <tr key={user._id} className={css.user}>
                  <td>{user.lastName}</td>
                  <td>{user.firstName}</td>
                  <td>{user.middleName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.resultsTrainingData.bestResult.map((result, index) => 
                    <p className={css.resultText} key={index}>
                      {`${user.resultsTrainingData.openPreview[index]}-й этап: `}
                      <span className={css.result}>{result}</span>
                    </p>
                  )}</td>
                  <td>
                    {user.resultsExamData.map((result, index) => 
                      <p className={css.resultText} key={index}>{`${index+1}) ${result}`}</p>
                    )}
                  </td>
                  <td>
                    <button className={`buttonDef ${css.edit} ${css.button}`} title='Редактировать'>
                      <GoPencil className={css.buttonSVG} />
                    </button>
                    <button className={`buttonDef ${css.remove} ${css.button}`} title='Удалить'>
                      <RiDeleteBin2Line className={css.buttonSVG} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <button className='buttonDef' onClick={updateUserData}>Обновить</button>
    </div>
  );
}

export default Admin;

