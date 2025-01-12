import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import css from './tabs.module.css'

const Tabs: FC = () => {
  type ActiveType = {
    isActive: boolean
  }
  const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';

  return (
    <div className={css.tabs}>
      <ul className={css.unList}>
        <li className={css.li}>
          <NavLink className={setActive} to='/'>Вопросы</NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={setActive} to='/training'>Обучение</NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={setActive} to='/exam'>Экзамен</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Tabs;