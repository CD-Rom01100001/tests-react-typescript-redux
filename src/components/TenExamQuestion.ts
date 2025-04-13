import contentQuest from '../data/allQuestions.json'
import type { AllQAT } from './allStageLink';

const questArray: AllQAT[][] = 
Object.entries(contentQuest).
map(elem => 
  elem[1].map(qa => qa)
)

const shuffle = (array: AllQAT[]) => {
  const arr = [...array]; // копия
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // меняем местами
  }
  return arr;
}

export const tenRandomQuestions = () => {
  /* новый массив */
  const newArr: AllQAT[] = []
  /* рандомно вытаскивает два вопросса из каждого раздела и помещается в новый массив */
  questArray.forEach(elem => {
    elem.
      sort(()=>
        Math.random()-0.5).
        slice(0, 2).
        forEach(elem=>newArr.push(elem)
      )
  })
  /* еще раз перемешиват, только уже новый массив */
  return shuffle(newArr)
}
