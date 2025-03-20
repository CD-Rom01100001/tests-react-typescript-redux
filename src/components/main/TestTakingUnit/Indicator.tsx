import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { getCurrentQuestion } from '../../../store/slices';
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
  const dispatch = useAppDispatch()

  return (
    <li className={css.wrap}>
      <NavLink to={`/training/stage-${sectionNum}/${numLink}`} className={setActive} onClick={()=>{
        dispatch(getCurrentQuestion(numLink))
      }}>
        {numName}
      </NavLink>
    </li>
  );
}

export default Indicator;