import { FC, /* useEffect, */ } from 'react';
// import { useAppDispatch } from '../../../store/hooks';
// import { getListPageId } from '../../../store/slices';
// import contentQuest from '../../../data/allQuestions.json'
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
          return <StagePreviewLink
          stageNumTitle={i+1}
          sectionAndNum={getSectionAndNumber(qa)}
          totalNumQuest={qa.length}
          key={i}/>
        })}
      </div>
    </div>
  );
}

export default Training;