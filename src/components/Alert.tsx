import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setStateAlert, getIndicatorId, clearAnswers, defineEndTest, setEndTime } from '../store/slices';

import css from './alert.module.css'

const Alert: FC = () => {

  const dispatch = useAppDispatch()
  const path = useAppSelector(state => state.alertTrainingIndex.path)
  const endTime = useAppSelector(state => state.alertTrainingIndex.endTime)
  // const location = useLocation().pathname.match(/^\/training\/stage-\d+$/)// проверка на соответствие шаблона адреса

  console.log(path)

  // const setPath = (): string => {
  //   return location ? '/training' : '/exam'
  // }

  const resetEndExit = () => {
    dispatch(getIndicatorId(0))
    dispatch(clearAnswers())// очищает объект с ответами
    dispatch(defineEndTest(false))
    dispatch(setEndTime(false))
    dispatch(setStateAlert('close'))
  }

  const returnAgainOrNo = () => {
    return endTime ? 
    window.location.reload() :
    dispatch(setStateAlert('close'))
  }

  return (
    <div className={css.alert}>
      <div className={css.alertWindow}>
        <p className={css.alertText}>
          {endTime ? 
          'Прохождение обучения заняло слишком много времени!' : 
          'Если вы покините тест, то все результаты будут сброшены!'}
        </p>
        <p className={css.alertText}>
          {endTime ? 
          'Процесс будет прерван!' : 
          'Хотите выйти?'}
        </p>
        <div className={css.buttons}>
          <NavLink 
            to={path} 
            className={css.button} 
            onClick={resetEndExit}>
            {endTime ? 
            'Выход' :
            'Да'}
          </NavLink>

          <button 
            className={css.button} 
            onClick={returnAgainOrNo}>
            {endTime ? 
            'Заново' :
            'Нет'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;