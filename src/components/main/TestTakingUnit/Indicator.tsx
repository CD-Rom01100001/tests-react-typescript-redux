import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import css from './indicator.module.css'


interface IndicatorProps {
  numName: number;
  numLink: number;
  sectionNum: number
}

const Indicator: FC<IndicatorProps> = ({numName, numLink, sectionNum}) => {
  type ActiveType = {
    isActive: boolean
  }
  const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';

  return (
    <li className={css.wrap}>
      <NavLink to={`/training/stage-${sectionNum}/${numLink}`} className={setActive}>
        {numName}
      </NavLink>
    </li>
  );
}

export default Indicator;