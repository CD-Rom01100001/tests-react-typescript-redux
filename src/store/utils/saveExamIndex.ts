export const saveExamIndex = (data: number) => {
  localStorage.setItem('examIndex', JSON.stringify(data))
}