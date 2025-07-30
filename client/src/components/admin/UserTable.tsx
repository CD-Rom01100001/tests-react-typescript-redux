import React, { forwardRef, ForwardRefRenderFunction, useState, useEffect } from 'react'
// import axios from 'axios'
import axiosInstance from '../../api/axiosInstance'
import { RiDeleteBin2Line } from "react-icons/ri"
import { GoPencil } from "react-icons/go"
import { FaCheck } from "react-icons/fa6"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { IoSettingsOutline } from "react-icons/io5"
import { getUsers, User } from '../../api/usersApi'
import Button from './Button'
import { deleteUserById } from '../../api/usersApi'
import css from './UserTable.module.css'

interface UserTableProps {
  users: User[]
  setUsers: (option: User[]) => void
  setLoading: (option: boolean) => void
}

const UserTable: ForwardRefRenderFunction<HTMLTableElement, UserTableProps> = ({ users, setUsers, setLoading }, ref) => {
  const [editUserId, setEditUserId] = useState<string | null>(null)// получить id пользователя
  const [editFormUsers, setEditFormUsers] = useState<User>({
    _id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    role: 'user',
    resultsTrainingData: {
      bestResult: [],
      lastResult: [],
      openPreview: []
    },
    resultsExamData: []
  })

  /* получим список пользователей из locslStorage */
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
  }, [setLoading, setUsers])

  /* получает id пользователя */
  const handleEdit = (userId: string) => {
    const userToEdit = users.find(u => u._id === userId)
    if (userToEdit) {
      setEditUserId(userId)
      setEditFormUsers({ ...userToEdit })
    }
  }

  /* обновлятет локальное состояние формы редактирования когда пользователь вводит новые значения в input */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
    type?: "resultsTraining" | "resultsExam"
  ) => {
    const { name, value } = e.target;

    if (type === "resultsTraining" && typeof index === "number") {
      const updated = [...editFormUsers.resultsTrainingData.bestResult];

      if (value === "") {
        updated.splice(index, 1);
      } else {
        updated[index] = value;
      }

      setEditFormUsers(prev => ({
        ...prev,
        resultsTrainingData: {
          ...prev.resultsTrainingData,
          bestResult: updated
        }
      }));
    } else if (type === "resultsExam" && typeof index === "number") {
      const updated = [...editFormUsers.resultsExamData];

      if (value === "") {
        updated.splice(index, 1);
      } else {
        updated[index] = value;
      }

      setEditFormUsers(prev => ({
        ...prev,
        resultsExamData: updated
      }));
    } else {
      setEditFormUsers(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  /* отправляет PUT-запрос на сервер, обновляет users и localStorage */
  const handleSave = async () => {
    if (!editUserId) {
      console.log('not users')
      return
    }
    try {
      await axiosInstance.put(`/api/users/${editUserId}`, editFormUsers)

      const updatedUsers = users.map(user =>
        user._id === editUserId ? { ...user, ...editFormUsers } : user
      )
      setUsers(updatedUsers)
      localStorage.setItem('userList', JSON.stringify(updatedUsers))
      setEditUserId(null)
      console.log('Отправляем PUT-запрос на URL:', axiosInstance.defaults.baseURL + `/api/users/${editUserId}`);
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error)
      alert("Не удалось обновить пользователя")
    }
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
            <th className={css.settings}><IoSettingsOutline /></th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => {
            const isEditing = editUserId === user._id
            return (
              <tr key={user._id} className={isEditing ? css.focus : css.user}>
                <td>
                  {
                    isEditing ? 
                      <input name="lastName" value={editFormUsers.lastName} onChange={handleChange} /> : 
                      <p>{user.lastName}</p>
                  }
                </td>
                <td>
                  {
                    isEditing ? 
                      <input name="firstName" value={editFormUsers.firstName} onChange={handleChange} /> : 
                      <p>{user.firstName}</p>
                  }
                </td>
                <td>
                  {
                    isEditing ? 
                      <input name="middleName" value={editFormUsers.middleName} onChange={handleChange} /> : 
                      <p>{user.middleName}</p>
                  }
                </td>
                <td>
                  {
                    isEditing ? 
                      <input name="email" value={editFormUsers.email} onChange={handleChange} /> : 
                      <p>{user.email}</p>
                  }
                </td>
                <td>
                  {
                    isEditing ? 
                      <input name="role" value={editFormUsers.role} onChange={handleChange} /> : 
                      <p>{user.role}</p>
                  }
                </td>
                {/* если нажат карандаш то input а иначе текст */}
                <td>
                  {user.resultsTrainingData.bestResult.map((result, index) =>{
                    return isEditing ? 
                      <div className={css.resultTextInput} key={index}>
                        <label>{`${user.resultsTrainingData.openPreview[index]}-й этап: `}</label>
                        <input
                          name="resultsTraining"
                          value={editFormUsers.resultsTrainingData.bestResult[index] || ''}
                          onChange={e => handleChange(e, index, "resultsTraining")}
                        />
                      </div> : 
                      <p className={css.resultText} key={index}>
                        {`${user.resultsTrainingData.openPreview[index]} этап: `}
                        <span className={css.result}>{result}</span>
                      </p>
                  })}
                </td>
                {/* если нажат карандаш то input а иначе текст */}
                <td>
                  {user.resultsExamData.map((result, index) => {
                    return isEditing ? 
                      <div key={index}>
                        <label>{`${index+1}) `}</label>
                        <input
                          name="resultsExam"
                          value={editFormUsers.resultsExamData[index] || ''}
                          onChange={e => handleChange(e, index, "resultsExam")}
                        />
                      </div> : 
                      <p className={css.resultText} key={index}>{`${index+1}) ${result}`}</p>
                  })}
                </td>
                <td className={css.buttonWrap}>
                  {/* если нажали на карандаш, то эта кнопка пропадает и появляется кнопка отмены и наоборот */}
                  {editUserId !== user._id ?
                  <Button iconType={<GoPencil />} title='Редактировать' onClick={() => handleEdit(user._id)}/> :
                  <>
                    <Button iconType={<MdOutlineKeyboardBackspace />} title='Отмена' onClick={() => setEditUserId(null)}/>
                    <Button iconType={<FaCheck />} title='Принять изменения' onClick={
                      () => {
                        console.log('click Принять изменения')
                        handleSave()
                      }
                    }/>
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
  )
}

export default forwardRef(UserTable)
