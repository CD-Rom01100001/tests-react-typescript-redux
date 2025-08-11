import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStageLink } from '../../allStageLink';
import { getSectionAndNumber } from '../../sectionAndNumber';
import { useDeviceType } from '../../hooks/useDeviceType';

import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import StagePreviewLink from './StagePreviewLink';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getTotalNumberPreview } from '../../../store/setResultsSlice';

import css from './training.module.css'

const Training: FC = () => {

  const dispatch = useAppDispatch()
  const userDataState = useAppSelector(state => state.userDataIndex.user)// меняет состояние превьюшек в зависимости от того залогинен пользователь или нет
  const isMobile = useDeviceType()

  useEffect(() => {
    dispatch(getTotalNumberPreview(getAllStageLink().length))
  }, [dispatch, userDataState])

  return (
    <div className={css.training}>
      
      {isMobile === 'mobile' && 
        <Link to='/' className='buttonDef'>Назад</Link>
      }

      <Description 
      title={contentDescr.training.title} 
      description={contentDescr.training.description}/>

      <div className={css.stageBlock}>
        {getAllStageLink().map((qa, i) => {
          return (
            <StagePreviewLink
            stageNumTitle={i+1}
            sectionAndNum={getSectionAndNumber(qa)}
            totalNumQuest={qa.length}
            key={i}/>
          )
        })}
      </div>
    </div>
  );
}

export default Training;