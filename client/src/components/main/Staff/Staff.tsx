import { FC } from 'react';
import css from './Staff.module.css'

const Staff: FC = () => {

  // const staff = [
  //   {
  //     lastName: 'string',
  //     firstName: 'string',
  //     patronymic: 'string',
  //     email: 'string',
  //     password: 'string',
  //   }
  // ]

  return (
    <div className={css.staff}>
      <h2>Успеваемость сотрудников</h2>

    </div>
  );
}

export default Staff;