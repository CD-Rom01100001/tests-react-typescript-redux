import { FC } from 'react';
import css from './IconUser.module.css'
import { useAppSelector } from '../../store/hooks';

const IconUser: FC = () => {

  const userDate = useAppSelector(state => state.userDataIndex.user)

  const getFirstLetterUser = (): string => {
    if (userDate) {
      return userDate.firstName[0].toUpperCase()
    }
    return ''
  }

  return (
    <div className={css.iconUser}>
      {getFirstLetterUser()}
    </div>
  );
}

export default IconUser;