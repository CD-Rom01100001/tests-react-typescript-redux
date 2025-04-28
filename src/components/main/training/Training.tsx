import { FC } from 'react';
import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import StagePreviewLink from './StagePreviewLink';
import { getAllStageLink } from '../../allStageLink';
import { getSectionAndNumber } from '../../sectionAndNumber';
import css from './training.module.css'

const Training: FC = () => {

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