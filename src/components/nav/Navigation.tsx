import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks';
import { getIndicatorId, clearAnswers, defineEndTest } from '../../store/slices';

import css from './navigation.module.css'

const Navigation: FC = () => {


  const dispatch = useAppDispatch()
  /* пра нажатии на кнопку ВЫХОД */
  const stopTest = () => {
    dispatch(getIndicatorId(0))
    dispatch(clearAnswers())// очищает объект с товетами
    dispatch(defineEndTest(false))
  }

  type ActiveType = {
    isActive: boolean
  }
  const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';


  return (
    <nav className={css.navigation}>
      <ul className={css.unList}>
      <li className={css.li}>
          <NavLink className={setActive} to='/' onClick={stopTest}>Главная</NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={setActive} to='/questions' onClick={stopTest}>Вопросы</NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={setActive} to='/training' onClick={stopTest}>Обучение</NavLink>
        </li>
        <li className={css.li}>
          <NavLink className={setActive} to='/exam' onClick={stopTest}>Экзамен</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;