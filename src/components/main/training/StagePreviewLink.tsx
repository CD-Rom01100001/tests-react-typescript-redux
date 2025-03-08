import { FC } from 'react';
import css from './stagePreviewLink.module.css'
import { Link } from 'react-router-dom';

interface StageLinkProps {
  stageNumTitle: number;
  sectionAndNum: [string, number][]
  totalNumQuest: number;
}

const StagePreviewLink: FC<StageLinkProps> = ({
  stageNumTitle,
  sectionAndNum,
  totalNumQuest
}) => {
  return (
    <Link to={`/training/stage-${stageNumTitle}`} className={css.stageLink}>
      <div className={css.previewBlock}>
        <h3 className={css.title}>{`${stageNumTitle}-й этап`}</h3>
        <ul className={css.stageNameBlock}>
          {sectionAndNum.map((elem, i) => 
              <li className={css.stageName} key={i}>{`${elem[0]} ${elem[1]}`}</li>
          )}
        </ul>
        <ul className={css.blockResults}>
          <li>{`последний результат:`}</li>
          <li>{`лучший результат:`}</li>
        </ul>
        <p className={css.totalNumQuestStage}>{`всего ${totalNumQuest} вопросов`}</p>
      </div>
    </Link>
  );
}

export default StagePreviewLink;