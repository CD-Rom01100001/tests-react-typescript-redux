import { FC } from 'react';
import css from './Admin.module.css'

const Admin: FC = () => {

  return (
    <div className={css.admin}>
      <h2 className={css.adminTitle}>Панель администратора</h2>
    </div>
  );
}

export default Admin;