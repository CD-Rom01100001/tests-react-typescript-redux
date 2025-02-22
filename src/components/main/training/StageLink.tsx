import { FC } from 'react';
import css from './stageLink.module.css'
import { Link } from 'react-router-dom';

interface StageLinkProps {
  stageNumTitle: number;
  // sectionName: string;
  // numQuestInSection: number;
  totalNumQuest: number;
}

const StageLink: FC<StageLinkProps> = ({
  stageNumTitle,
  // sectionName,
  // numQuestInSection,
  totalNumQuest
}) => {
  return (
    <Link to={`/training/${stageNumTitle}`} className={css.stageLink}>
      <div className={css.previewBlock}>
        <h3 className={css.Title}>{`${stageNumTitle}-й этап`}</h3>
        <p className={css.stageName}>{/* {`${sectionName} - ${numQuestInSection}`} */}</p>
        <p className={css.totalNumQuestStage}>{`всего ${totalNumQuest} вопросов`}</p>
      </div>
    </Link>
  );
}

export default StageLink;