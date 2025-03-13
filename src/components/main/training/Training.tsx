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

// console.log(getAllStageLink());

const Training: FC = () => {
  // const identifiers = getAllStageLink().length
  // const dispatch = useAppDispatch()
  // useEffect(()=>{
  //   dispatch(getListPageId(identifiers))
  // }, [dispatch, identifiers])

  return (
    <div className={css.training}>
      <Description 
      title={contentDescr.training.title} 
      description={contentDescr.training.description}/>

      <div className={css.stageBlock}>
        {getAllStageLink().map((qa, i) => {
          // console.log(qa);
          return <StagePreviewLink /* allStageLink={getAllStageLink()} */
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