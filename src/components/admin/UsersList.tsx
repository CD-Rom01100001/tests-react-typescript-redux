import { FC } from 'react';
import css from './UsersList.module.css'

const UsersList: FC = () => {

  return (
    <div className={css.usersList}>
      <h2>Список пользователей</h2>
    </div>
  );
}

export default UsersList;