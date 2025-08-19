import { FC, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { getUsers, User } from '../../api/usersApi'
import UserTable from './UserTable'
import { useDeviceType } from '../hooks/useDeviceType'
import css from './Admin.module.css'

const Admin: FC = () => {
  const [users, setUsers] = useState<User[]>([])// список пользователей из locslStorage
  const [loading, setLoading] = useState(true)// загрузка
  const [cloneWidth, setCloneWidth] = useState(0)
  const [tableScrollWidth, setTableScrollWidth] = useState(0)

  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const scrollbarCloneRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const isMobile = useDeviceType()

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

  /* дубликат прокрутки */
  useEffect(() => {
    const tableWrapper = tableWrapperRef.current
    const scrollbarClone = scrollbarCloneRef.current
    const table = tableRef.current

    if (!tableWrapper || !scrollbarClone || !table) return

    /* 1. Синхронизация прокрутки */
    const syncScroll = (from: HTMLElement, to: HTMLElement) => {
      const onScroll = () => {
        to.scrollLeft = from.scrollLeft
      }
      from.addEventListener('scroll', onScroll)
      return () => from.removeEventListener('scroll', onScroll)
    }

    const removeScroll1 = syncScroll(tableWrapper, scrollbarClone)
    const removeScroll2 = syncScroll(scrollbarClone, tableWrapper)

    /* 2. Установка ширины scrollbarClone */
    const updateCloneWidth = () => {
      setCloneWidth(tableWrapper.clientWidth)
    }
    updateCloneWidth()

    window.addEventListener('resize', updateCloneWidth)

    /* 3. ResizeObserver для отслеживания ширины таблицы */
    const resizeObserver = new ResizeObserver(() => {
      setTableScrollWidth(table.scrollWidth)
    })

    resizeObserver.observe(table)

    /* Установка начального значения */
    setTableScrollWidth(table.scrollWidth)

    /* Очистка */
    return () => {
      removeScroll1()
      removeScroll2()
      window.removeEventListener('resize', updateCloneWidth)
      resizeObserver.disconnect()
    }
  }, [users])
  

  return (
    <div className={css.admin}>
      <Link to='/' className='btnBackMobile buttonDef'>&lt;</Link>

      <h2 className={css.adminTitle}>Панель администратора</h2>
      {loading &&
        <p>Ожидает загрузку пользователей...</p>
      }
      {!isMobile ? 
        <div className={css.tableWrapper} ref={tableWrapperRef}>
        <UserTable ref={tableRef} users={users} setUsers={setUsers} setLoading={setLoading}/>
      </div> :
      <UserTable ref={tableRef} users={users} setUsers={setUsers} setLoading={setLoading}/>
      }
      
       {/* Прокрутка снизу */}
      <div className={css.scrollbarClone} ref={scrollbarCloneRef} style={{ width: cloneWidth }}>
        <div style={{ width: tableScrollWidth, height: 1 }}></div>
      </div>

      <button className='buttonDef' onClick={updateUserData}>Обновить</button>
    </div>
  )
}

export default Admin

