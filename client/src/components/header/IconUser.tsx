import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setStateUserWindow } from '../../store/userWindowSlice';
import css from './IconUser.module.css'


const IconUser: FC = () => {

  const userDate = useAppSelector(state => state.userDataIndex.user)
  const dispatch = useAppDispatch()

  const getFirstLetterUser = (): string => {
    if (userDate) {
      return userDate.firstName[0].toUpperCase()
    }
    return ''
  }

  const getFullName = (): string => {
    return `${userDate?.lastName} ${userDate?.firstName} ${userDate?.middleName}`
  }

  return (
    <div className={css.iconUser} title={getFullName()} onClick={()=>dispatch(setStateUserWindow())}>
      {getFirstLetterUser()}
    </div>
  );
}

export default IconUser;