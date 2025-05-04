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

  const resultsData = useAppSelector(state => state.resultsDataIndex.resultsData)
  const date = new Date().toLocaleDateString()
  console.log(resultsData)

  const setResult = (result: string): string => {
    const currPrevIndex = stageNumTitle-1
    if (result === 'last') {
      if (resultsData.lastResult[currPrevIndex] !== undefined) {
        return `${resultsData.lastResult}% (${date})`
      }
    }
    else if (result === 'best') {
      if (resultsData.bestResult[currPrevIndex] !== undefined) {
        return `${resultsData.bestResult}% (${date})`
      }
    }
    return 'нет результата'
  }


  return (
    <div className={css.linkWrap}>
      {/* если соответствует условию то применяется блокировка превьюшки */}
      {(resultsData.openPreview[stageNumTitle-1] !== stageNumTitle) &&
        <div className={css.blur}>
          <img src={lock} className={css.lock} alt="lock" />
        </div>
      }
      {/* иначе превьюшка разблокируется */}
      <Link to={`/training/stage-${stageNumTitle}`} className={`${css.stageLink}`}>
        <div className={css.previewBlock}>
          <h3 className={css.title}>{`${stageNumTitle}-й этап`}</h3>
          <ul className={css.stageNameBlock}>
            {sectionAndNum.map((elem, i) => {
                return <li className={css.stageName} key={i}>{`${elem[0]} ${elem[1]}`}</li>
            })}
          </ul>
          <ul className={css.blockResults}>
            <li className={css.resultTxt}>последний результат: <span>{setResult('last')}</span></li>
            <li className={css.resultTxt}>лучший результат: <span>{setResult('best')}</span></li>
          </ul>
          <p className={css.totalNumQuestStage}>{`всего ${totalNumQuest} вопросов`}</p>
        </div>
      </Link>
    </div>
  );
}

export default StagePreviewLink;