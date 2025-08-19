import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDeviceType } from '../hooks/useDeviceType';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getIndicatorId, clearAnswers, defineEndTest, setStateAlert, setPath } from '../../store/slices';

import css from './navigation.module.css'

const Navigation: FC = () => {

  const dispatch = useAppDispatch()
  const defineEndTestSlice = useAppSelector(state => state.defineEndTestIndex.defineEnd)
  const userData = useAppSelector(state => state.userDataIndex.user)
  const isMobile = useDeviceType()

  /* пра нажатии на кнопку ВЫХОД */
  const stopTest = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const path = e.currentTarget.getAttribute('href')
    if (path !== null) {
      dispatch(setPath(path))
      dispatch(getIndicatorId(0))
      dispatch(clearAnswers())// очищает объект с товетами
      dispatch(defineEndTest(false))
    }
  }

  const x = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const path = e.currentTarget.getAttribute('id')
    if (path !== null) {
      console.log(path)
      dispatch(setStateAlert('open'))
      dispatch(setPath(path))
    }
  }

  const locationTraining = useLocation().pathname.match(/^\/training\/stage-\d+$/)// проверка на соответствие шаблона адреса
  const locationExam = useLocation().pathname.match(/^\/exam\/test/)// проверка на соответствие шаблона адреса

  type ActiveType = {
    isActive: boolean
  }
  const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';

  const xxx: string = 'admin'//!!!!!!!!!!!!!!
  
  return (
    <nav className={css.navigation}>
      <ul className={css.unList}>
        <li className={css.li}>
          {((locationTraining || locationExam) && !defineEndTestSlice) ? 
            <p id='/' onClick={x} className={css.p}>О ГЦСС</p> :
            <NavLink className={setActive} to={isMobile === 'PC' ? '/' : 'home'} onClick={stopTest}>О ГЦСС</NavLink>
          }
        </li>
        <li className={css.li}>
          {((locationTraining || locationExam) && !defineEndTestSlice) ? 
            <p id='/questions' onClick={x} className={css.p}>Вопросы</p> :
            <NavLink className={setActive} to='/questions' onClick={stopTest}>Вопросы</NavLink>
          }
        </li>
        <li className={css.li}>
          {((locationTraining || locationExam) && !defineEndTestSlice) ? 
            <p id='/training-materials' onClick={x} className={css.p}>Учебные материалы</p> :
            <NavLink className={setActive} to='/training-materials' onClick={stopTest}>Учебные материалы</NavLink>
          }
        </li>
        <li className={css.li}>
          {((locationTraining || locationExam) && !defineEndTestSlice) ? 
            <p id='/training' onClick={x} className={`${css.p} ${locationTraining && !defineEndTestSlice ? css.active : ''}`}>Обучение</p> :
            <NavLink className={setActive} to='/training' onClick={stopTest}>Обучение</NavLink>
          }
        </li>
        <li className={css.li}>
          {((locationTraining || locationExam) && !defineEndTestSlice) ? 
            <p id='/exam' onClick={x} className={`${css.p} ${locationExam && !defineEndTestSlice ? css.active : ''}`}>Экзамен</p> :
            <NavLink className={setActive} to='/exam' onClick={stopTest}>Экзамен</NavLink>
          }
        </li>
        {/* !!!!!!!!!!!!!!!!!!!!!!!!!! */}
        {/* userData?.role */ xxx === 'admin' &&
          <li className={css.li}>
            {((locationTraining || locationExam) && !defineEndTestSlice) ? 
              <p id='/settings' onClick={x} className={`${css.p} ${locationExam && !defineEndTestSlice ? css.active : ''}`}>Настройки</p> :
              <NavLink className={setActive} to='/settings' onClick={stopTest}>Настройки</NavLink>
            }
          </li>
        }
        {/* !!!!!!!!!!!!!!!!!!!!!!!!!! */}
        {(/* userData?.role */ xxx === 'admin' /* || userData?.role === 'moderator' */) &&
          <li className={css.li}>
            {((locationTraining || locationExam) && !defineEndTestSlice) ? 
              <p id='/users' onClick={x} className={`${css.p} ${locationExam && !defineEndTestSlice ? css.active : ''}`}>Пользователи</p> :
              <NavLink className={setActive} to='/users' onClick={stopTest}>Пользователи</NavLink>
            }
          </li>
        }
      </ul>
    </nav>
  );
}

export default Navigation;