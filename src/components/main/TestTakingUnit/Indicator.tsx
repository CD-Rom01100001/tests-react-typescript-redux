import { FC, RefObject, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { getCurrentQuestionId } from '../../../store/slices';
import css from './indicator.module.css'
interface IndicatorProps {
  numName: number;
}

const Indicator: FC<IndicatorProps> = ({numName}) => {
  // type ActiveType = {
  //   isActive: boolean
  // }
  // const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';
  const dispatch = useAppDispatch()

  const currentQuest = useRef<HTMLLIElement>(null)

  // const getCurrentNumQuest = () => {
  //   const x = currentQuest.current?.innerHTML
  //   console.log(x);
  // }

  return (
    // <li className={css.wrap}>
    //   <NavLink 
    //   to={`/training/stage-${sectionNum}/${numLink}`} 
    //   className={setActive} 
    //   onClick={()=>{
    //     dispatch(getCurrentQuestion(numLink))
    //   }}>
    //     {numName}
    //   </NavLink>
    // </li>
    <li className={css.indicator} ref={currentQuest} onClick={()=>{
      const num = Number(currentQuest.current?.innerHTML)
      dispatch(getCurrentQuestionId(num-1))
      }}>
      {numName}
    </li>
  );
}

export default Indicator;