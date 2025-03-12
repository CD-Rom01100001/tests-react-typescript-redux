import { FC } from 'react';
import css from './indicator.module.css'
import { NavLink } from 'react-router-dom';

interface IndicatorProps {
  numName: number;
  numLink: number;
  sectionNum: number
}

const Indicator: FC<IndicatorProps> = ({numName, numLink, sectionNum}) => {

  return (
    <li className={css.wrap}>
      <NavLink to={`/training/stage-${sectionNum}/${numLink}`} className={css.link}>
        {numName}
      </NavLink>
    </li>
  );
}

export default Indicator;