import { FC } from 'react';
import { Link } from 'react-router-dom';
import contentQuest from '../../../data/allQuestions.json'
import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
// import StageLink from './StageLink';
import css from './training.module.css'

type AnswersT = {
  correct: boolean;
  id: string;
  section: string;
  value: string
}
type AllQAT = {
  answers: AnswersT[];
  question: string
}
const questArray: AllQAT[][] = 
Object.entries(contentQuest).
map(elem => 
  elem[1].map(qa => qa)
)
const getAllQA = (): AllQAT[] => {
  const allQA: AllQAT[] = []
  const recursionFunc = (arr: AllQAT[] | AllQAT[][])/* parameter */ => {
    arr.forEach((elem) => 
      Array.isArray(elem) ?
      recursionFunc(elem) :
      allQA.push(elem)
    )
  }
  recursionFunc(questArray)/* argument */
  return allQA
}
const getAllStageLink = () => {
  const localAllQA = getAllQA();
  const newArr: AllQAT[][] = []
  let inArr: AllQAT[] = []
  let count = localAllQA.length-35

  for(let i = localAllQA.reverse().length - 1; i >= 0; i--) {
    inArr.push(localAllQA[i])
    localAllQA.splice(i, 1)
    if (localAllQA.length === count || localAllQA.length === 0) {
      count = count-35
      newArr.push(inArr)
      inArr = []
    }
  }
  return newArr
}
const getSectionAndNumber = (arr: AllQAT[]): [string, number][] => {
  const sectionNameArray: string[] = [];
  arr.forEach(qa => sectionNameArray.push(qa.answers[0].section))
  const sectionAndNum = sectionNameArray.reduce((obj: { [x: string]: number; }, cur: string | number) => {
    obj[cur] = obj[cur] ? obj[cur] + 1 : 1
    return obj
  }, {})
  return Object.entries(sectionAndNum)
}


const Training: FC = () => {
  return (
    <div className={css.training}>
      <Description 
      title={contentDescr.training.title} 
      description={contentDescr.training.description}/>

      <div className={css.stageBlock}>
        
        {getAllStageLink().map((qa, i) => 
        <Link to={`/training/${i+1}`} className={css.stageLink} key={i}>
            <div className={css.previewBlock}>
              <h3 className={css.Title}>{`${i+1}-й этап`}</h3>
              {getSectionAndNumber(qa).map((elem, i) => 
                <p className={css.stageName} key={i}>{`${elem[0]} ${elem[1]}`}</p>
              )}
              <p className={css.totalNumQuestStage}>{`всего ${qa.length} вопросов`}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Training;