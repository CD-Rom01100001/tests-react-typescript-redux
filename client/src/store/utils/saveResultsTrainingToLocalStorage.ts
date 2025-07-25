import type { ResultData } from "../setResultsSlice"

export const saveResultsTrainingToLocalStorage = (data: ResultData) => {
  localStorage.setItem('resultsTrainingData', JSON.stringify(data))
}