import { FC } from 'react';
import css from './stagePreviewLink.module.css'
import { Link } from 'react-router-dom';
import lock from '../../../assets/images/lockblocked_122039.svg'
import { useAppSelector } from '../../../store/hooks';

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

  const openStages = useAppSelector(state => state.arrayAnswersIndex.openStages)

  return (
    <div className={css.linkWrap}>
      {(stageNumTitle > openStages) &&
        <div className={css.blur}>
          <img src={lock} className={css.lock} alt="lock" />
        </div>
      }
      <Link to={`/training/stage-${stageNumTitle}`} className={`${css.stageLink}`}>
        <div className={css.previewBlock}>
          <h3 className={css.title}>{`${stageNumTitle}-й этап`}</h3>
          <ul className={css.stageNameBlock}>
            {sectionAndNum.map((elem, i) => {
                return <li className={css.stageName} key={i}>{`${elem[0]} ${elem[1]}`}</li>
            })}
          </ul>
          <ul className={css.blockResults}>
            <li>{`последний результат:`}</li>
            <li>{`лучший результат:`}</li>
          </ul>
          <p className={css.totalNumQuestStage}>{`всего ${totalNumQuest} вопросов`}</p>
        </div>
      </Link>
    </div>
  );
}

export default StagePreviewLink;