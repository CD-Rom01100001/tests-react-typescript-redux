import { FC, useEffect } from 'react';
import { getAllStageLink } from '../../allStageLink';
import { getSectionAndNumber } from '../../sectionAndNumber';

import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import StagePreviewLink from './StagePreviewLink';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { getTotalNumberPreview } from '../../../store/setResultsSlice';

import css from './training.module.css'

const Training: FC = () => {

  const totalNumberPreview = useAppSelector(state => state.resultsDataIndex.totalNumberPreview)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTotalNumberPreview(getAllStageLink().length))
  }, [dispatch])

  return (
    <div className={css.training}>
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