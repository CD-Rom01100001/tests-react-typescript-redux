import { FC } from 'react';
import css from './indicator.module.css'
import { NavLink } from 'react-router-dom';

interface IndicatorProps {
  number: number
}

const Indicator: FC<IndicatorProps> = ({number}) => {

  return (
    <li className={css.wrap}>
      <NavLink to={''} className={css.link}>
        {number}
      </NavLink>
    </li>
  );
}

export default Indicator;