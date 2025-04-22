import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setStateAlert, } from '../store/slices';

import css from './alert.module.css'

const Alert: FC = () => {

  const dispatch = useAppDispatch()
  const defineEndTestSlice = useAppSelector(state => state.defineEndTestIndex.defineEnd)

  return (
    <div className={css.alert}>
      <div className={css.alertWindow}>
        <p className={css.alertText}>Прохождение обучения заняло слишком много времени!</p>
        <p className={css.alertText}>Процесс будет прерван!</p>
        <div className={css.buttons}>
          <NavLink to='/' className={css.button} onClick={()=>dispatch(setStateAlert('close'))}>на главную</NavLink>
          <button className={css.button} onClick={()=>window.location.reload()}>Заново</button>
        </div>
      </div>
    </div>
  );
}

export default Alert;