import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import css from './navigation.module.css'

const Navigation: FC = () => {
  type ActiveType = {
    isActive: boolean
  }
  const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';


  return (
    <nav className={css.navigation}>
      <ul className={css.unList}>
      <li className={css.li}>
          <NavLink className={setActive} to='/'>Главная</NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={setActive} to='/questions'>Вопросы</NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={setActive} to='/training'>Обучение</NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={setActive} to='/exam'>Экзамен</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;