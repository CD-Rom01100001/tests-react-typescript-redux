import contentQuest from '../data/allQuestions.json'

type AnswersT = {
  correct: boolean;
  id: string;
  section: string;
  value: string
}
export type AllQAT = {
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
export const getAllStageLink = () => {
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