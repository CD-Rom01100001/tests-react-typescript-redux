export const saveResultsExamToLocalStorage = (data: string[]) => {
  localStorage.setItem('resultsExamData', JSON.stringify(data))
}