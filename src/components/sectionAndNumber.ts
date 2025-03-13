import { AllQAT } from "./allStageLink";

export const getSectionAndNumber = (arr: AllQAT[]): [string, number][] => {
  const sectionNameArray: string[] = [];
  arr.forEach(qa => sectionNameArray.push(qa.answers[0].section))
  const sectionAndNum = sectionNameArray.reduce((obj: { [x: string]: number; }, cur: string | number) => {
    obj[cur] = obj[cur] ? obj[cur] + 1 : 1
    return obj
  }, {})
  return Object.entries(sectionAndNum)
}