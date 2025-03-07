import { FC, useEffect, } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { getListPageId } from '../../../store/slices';
import contentQuest from '../../../data/allQuestions.json'
import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import StageLink from './StageLink';
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
  console.log(newArr);
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
  const identifiers = getAllStageLink().length
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getListPageId(identifiers))
  }, [dispatch, identifiers])

  return (
    <div className={css.training}>
      <Description 
      title={contentDescr.training.title} 
      description={contentDescr.training.description}/>

      <div className={css.stageBlock}>
        {getAllStageLink().map((qa, i) => 
          <StageLink stageNumTitle={i+1}
          sectionAndNum={getSectionAndNumber(qa)}
          totalNumQuest={qa.length}
          key={i}/>
        )}
      </div>
    </div>
  );
}

export default Training;