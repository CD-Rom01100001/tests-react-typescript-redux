import React, { forwardRef, ForwardRefRenderFunction, useState, useEffect } from 'react';
import { RiDeleteBin2Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { getUsers, User } from '../../api/usersApi';
import Button from './Button';
import { deleteUserById } from '../../api/usersApi';
import css from './UserTable.module.css'

interface UserTableProps {
  users: User[];
  setUsers: (option: User[]) => void;
  setLoading: (option: boolean) => void;
}

const UserTable: ForwardRefRenderFunction<HTMLTableElement, UserTableProps> = ({users, setUsers, setLoading}, ref) => {

  const [editUserId, setEditUserId] = useState<string | null>(null)// получить id пользователя
  // const [editFormUsers, setEditFormUsers] = useState({
  //   lastName: '',
  //   firstName: '',
  //   middleName: '',
  //   email: '',
  //   password: '',
  //   role: '',
  //   resultsTrainingData: {
  //     bestResult: [],
  //     lastResult: [],
  //     openPreview: []
  //   },
  //   resultsExamData: [],
  // })

  /* получим список пользователей из locslStorage */
  useEffect(() => {
    const cachedUsers = localStorage.getItem('userList')
    const loadUsersList = async () => {
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers))
        console.log(cachedUsers)
        console.log(JSON.parse(cachedUsers))
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
  }, [setLoading, setUsers])

  /* получает id пользователя */
  const handleEdit = (userId: string) => {
    setEditUserId(prev => prev === userId ? null : userId)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = event.target.value;
    console.log(value)
  }

  /* удаляет пользователя целиком */
  const handleDeleteUser = async (id: string) => {
    const assent = confirm("Вы уверены, что хотите удалить пользователя?")
    if (assent === false) return

    try {
      // удаление с сервера
      await deleteUserById(id)

      // обновление состояния users
      const updatedUsers = users.filter(user => user._id !== id)
      setUsers(updatedUsers)

      // обновление localStorage
      localStorage.setItem('userList', JSON.stringify(updatedUsers))
    } catch (error) {
      alert('Ошибка при удалении пользователя')
    }
  }

  /* сделать расположение пользователей в алфавитном порядке */
  const sortedUsers = users.sort((a, b) => a.lastName.localeCompare(b.lastName))

  return (
    <div className={css.userTable}>
      <table ref={ref}>
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
                <td>
                  {
                    editUserId === user._id ? 
                      <input name="lastName" value={user.lastName} onChange={handleChange}/> : 
                      <p>{user.lastName}</p>
                  }
                </td>
                <td>
                  {
                    editUserId === user._id ? 
                      <input name="firstName" value={user.firstName} onChange={handleChange}/> : 
                      <p>{user.firstName}</p>
                  }
                </td>
                <td>
                  {
                    editUserId === user._id ? 
                      <input name="middleName" value={user.middleName} onChange={handleChange}/> : 
                      <p>{user.middleName}</p>
                  }
                </td>
                <td>
                  {
                    editUserId === user._id ? 
                      <input name="email" value={user.email} onChange={handleChange}/> : 
                      <p>{user.email}</p>
                  }
                </td>
                <td>
                  {
                    editUserId === user._id ? 
                      <input name="role" value={user.role} onChange={handleChange}/> : 
                      <p>{user.role}</p>
                  }
                </td>
                {/* если нажат карандаш то input а иначе текст */}
                <td>
                  {user.resultsTrainingData.bestResult.map((result, index) => 
                    {return editUserId === user._id ?
                      <div key={index}>
                        <label>{`${user.resultsTrainingData.openPreview[index]}-й этап: `}</label>
                        <input name="resultsTraining" value={result} onChange={handleChange}/>
                      </div> :
                      <p className={css.resultText} key={index}>
                        {`${user.resultsTrainingData.openPreview[index]}-й этап: `}
                        <span className={css.result}>{result}</span>
                      </p>
                    }
                  )}
                </td>
                {/* если нажат карандаш то input а иначе текст */}
                <td>
                  {user.resultsExamData.map((result, index) => 
                    {return editUserId === user._id ?
                      <div key={index}>
                        <label>{`${index+1}) `}</label>
                        <input name="resultsExam" value={result} onChange={handleChange}/>
                      </div> :
                      <p className={css.resultText} key={index}>{`${index+1}) ${result}`}</p>
                    }
                  )}
                </td>
                <td className={css.buttonWrap}>
                  {/* если нажали на карандаш, то эта кнопка пропадает и появляется кнопка отмены и наоборот */}
                  {editUserId !== user._id ?
                  <Button iconType={<GoPencil />} title='Редактировать' onClick={() => handleEdit(user._id)}/> :
                  <>
                    <Button iconType={<MdOutlineKeyboardBackspace />} title='Отмена' onClick={() => setEditUserId(null)}/>
                    <Button iconType={<FaCheck />} title='Принять изменения' onClick={() => setEditUserId(null)}/>
                  </>
                  }
                  <Button iconType={<RiDeleteBin2Line />} onClick={() => handleDeleteUser(user._id)} title='Удалить'/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default forwardRef(UserTable);