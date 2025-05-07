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

  const resultsTrainingData = useAppSelector(state => state.resultsDataIndex.resultsTrainingData)
  const dataLocalStorage = localStorage.getItem('resultsTrainingData')
  console.log(resultsTrainingData)

  const setResult = (result: 'last' | 'best'): string => {
    const currPrevIndex = stageNumTitle - 1

    /* если localStorage не пустой то в source из него парсится объект, 
    а иначе объект берется из редбьюсера */
    const source = dataLocalStorage ?
      JSON.parse(dataLocalStorage) :
      resultsTrainingData

    const resultArray = source[`${result}Result`]// в зависимости от того что будет прописано в аргументе функции setResult динамически формируется имя ключа объекта lastResult или bestResult в которых соответственно хронятся свои массивы данных.

    /* возвращает элемент по индексу, если элемента с таким индексом нет, то возвращает 'нет результата' */
    return resultArray[currPrevIndex] ?? 'нет результата'
    
  }

  const setPreviewLock = () => {
    const currPrevIndex = stageNumTitle-1

    /* если localStorage не пустой то в source из него парсится объект, 
    а иначе объект берется из редбьюсера */
    const source = dataLocalStorage ?
      JSON.parse(dataLocalStorage) :
      resultsTrainingData

    const isLocked = source.openPreview[currPrevIndex] !== stageNumTitle// true/false

    if (isLocked) {
      return (
        <div className={css.blur}>
          <img src={lock} className={css.lock} alt="lock" />
        </div>
      )
    }

    return null
  }


  return (
    <div className={css.linkWrap}>
      {/* если соответствует условию то применяется блокировка превьюшки */}
      {setPreviewLock()}
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