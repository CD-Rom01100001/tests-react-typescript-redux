import type { ResultData } from "../setResultsSlice"

export const saveResultsToLocalStorage = (data: ResultData) => {
  localStorage.setItem('resultsData', JSON.stringify(data))
}