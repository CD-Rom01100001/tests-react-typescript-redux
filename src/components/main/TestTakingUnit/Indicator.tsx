import { FC } from 'react';
import css from './indicator.module.css'
import { NavLink } from 'react-router-dom';

interface IndicatorProps {
  numName: number
  numLink: number
}

const Indicator: FC<IndicatorProps> = ({numName, numLink}) => {

  return (
    <li className={css.wrap}>
      <NavLink to={`/training/stage-1/${numLink}`} className={css.link}>
        {numName}
      </NavLink>
    </li>
  );
}

export default Indicator;