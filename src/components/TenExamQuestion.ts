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

const shuffle = (array: AllQAT[]) => {
  const arr = [...array]; // копия
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // меняем местами
  }
  return arr;
}

export const tenRandomQuestions = (questions: AllQAT[][]) => {
  /* новый массив */
  const newArr: AllQAT[] = []
  /* рандомно вытаскивает два вопросса из каждого раздела и помещается в новый массив */
  Object.entries(questions).forEach(elem => {
    elem[1].
      sort(()=>
        Math.random()-0.5).
        slice(0, 2).
        forEach(elem=>newArr.push(elem)
      )
  })
  /* еще раз перемешиват, только уже новый массив */
  return shuffle(newArr)
}
