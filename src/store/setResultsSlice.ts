import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveResultsTrainingToLocalStorage } from "./utils/saveResultsTrainingToLocalStorage";
import { saveResultsExamToLocalStorage } from "./utils/saveResultsExamToLocalStorage";
import { saveExamIndex } from "./utils/saveExamIndex";

export type ResultData = {
  bestResult: string[],
  lastResult: string[],
  openPreview: number[]
}

interface InitialStateI {
  trainingLocate: null | 'training' | 'exam';
  totalNumberPreview: number;
  previewNumber: number;
  resultsTrainingData: ResultData;
  resultsExamData: string[];
  index: number;
}

const initialState: InitialStateI = {
  trainingLocate: null,
  totalNumberPreview: 0,
  previewNumber: 1,
  resultsTrainingData: JSON.parse(localStorage.getItem('resultsTrainingData') || JSON.stringify({
    bestResult: [],
    lastResult: [],
    openPreview: [1]
  })),
  resultsExamData: JSON.parse(localStorage.getItem('resultsExamData') || '[]'),
  index: JSON.parse(localStorage.getItem('examIndex') || '0')
}

const resultsDataSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    getTrainingLocate: (state, action: PayloadAction<'training' | 'exam'>) => {
      state.trainingLocate = action.payload
    },
    getTotalNumberPreview: (state, action: PayloadAction<number>) => {
      state.totalNumberPreview = action.payload
    },
    setOpenPreviewNumber: (state, action: PayloadAction<number>) => {
      state.previewNumber = action.payload
    },
    /* заполняет массив с открытыми превьюшками "openPreview" */
    setOpenPreview: (state, action: PayloadAction<number>) => {
      if (state.trainingLocate !== 'training') return

      const currentArray = state.resultsTrainingData.openPreview
      /* если прилетает номер(action.payload) который уже есть в массиве(openPreview) то не добавляет номер в массив. Нужно это для того, что-бы при повторном прохождении этапа массив не заполнялся повторяющимеся числами. */
      if (!currentArray.includes(action.payload)) {
        if (currentArray.length === state.totalNumberPreview) return// не дает превышать размер массива больше чем количество превьюшек
        currentArray.push(action.payload)
      }  
    },
    /* заполняет массив с лучшими результатами "bestResult" */
    setBestResult: (state, action: PayloadAction<string>) => {
      if (state.trainingLocate !== 'training') return
    
      const bestResult = state.resultsTrainingData.bestResult
      const curPrevNum = state.previewNumber-1
      const currentResult = +action.payload.split('%')[0]// вытаскивает только число из результата и превращает его в тип number
      const oldResultRaw = bestResult[curPrevNum]?.split('%')[0]// вытаскивает только число из результата
      const oldResult = oldResultRaw ? +oldResultRaw : 0// проверка на undefined, в любом случае вернет число

      if (currentResult > oldResult || bestResult[curPrevNum] === undefined) {
        bestResult.splice(curPrevNum, 1, action.payload)
        saveResultsTrainingToLocalStorage(state.resultsTrainingData)
      }
      return
    },
    /* заполняет массив с лучшими результатами "lastResult" */
    setLastResult: (state, action: PayloadAction<string>) => {
      if (state.trainingLocate !== 'training') return

      const lastResult = state.resultsTrainingData.lastResult
      const curPrevNum = state.previewNumber-1

      lastResult.splice(curPrevNum, 1, action.payload)
      saveResultsTrainingToLocalStorage(state.resultsTrainingData)
    },
    /* заполняет массив "resultsExamData" результатами из секции "Экзамен" */
    setExamHistory: (state, action: PayloadAction<string>) => {
      if (state.trainingLocate === 'training') return

      const currentResult = action.payload
      const results = state.resultsExamData
      const maxLength = 10

      if (results.length < maxLength) {
        results.push(currentResult)
        saveResultsExamToLocalStorage(results)
      } else {
        results[state.index] = currentResult
        saveExamIndex(state.index+1)
        state.index = (state.index + 1) % maxLength
        saveResultsExamToLocalStorage(results)
      }
    }
  }
})

export const {
  getTrainingLocate,
  setOpenPreview,
  setOpenPreviewNumber,
  getTotalNumberPreview,
  setBestResult,
  setLastResult,
  setExamHistory
} = resultsDataSlice.actions
export const resultsDataReducer = resultsDataSlice.reducer