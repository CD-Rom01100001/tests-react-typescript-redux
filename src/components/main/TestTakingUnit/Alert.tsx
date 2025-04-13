import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import css from './alert.module.css'
import { setStateAlert } from '../../../store/slices';

const Alert: FC = () => {

  const dispatch = useAppDispatch()

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