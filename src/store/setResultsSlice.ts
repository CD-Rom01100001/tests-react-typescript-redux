import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveResultsTrainingToLocalStorage } from "./utils/saveResultsTrainingToLocalStorage";
import { saveResultsExamToLocalStorage } from "./utils/saveResultsExamToLocalStorage";

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
}

const initialState: InitialStateI = {
  trainingLocate: null,
  totalNumberPreview: 0,
  previewNumber: 1,
  resultsTrainingData: JSON.parse(localStorage.getItem('resultsTrainingData') || JSON.stringify({
    bestResult: [],
    lastResult: [],
    openPreview: [1]
  })),//! new
  resultsExamData: JSON.parse(localStorage.getItem('resultsExamData') || '[]')//! new
  // resultsTrainingData: {
  //   bestResult: [],
  //   lastResult: [],
  //   openPreview: [1]
  // },
  // resultsExamData: []
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

      if (action.payload > bestResult[curPrevNum] || bestResult[curPrevNum] === undefined) {
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
      let index = 0

      if (results.length < maxLength) {
        results.push(currentResult)
        saveResultsExamToLocalStorage(results)
      } else {
        results[index] = currentResult
        index = (index + 1) % maxLength
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