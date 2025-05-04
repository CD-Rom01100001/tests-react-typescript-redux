import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResultData = {
  bestResult: number[],
  lastResult: number[],
  openPreview: number[]
}

interface InitialStateI {
  totalNumberPreview: number;
  previewNumber: number;
  resultsData: ResultData;
}

const initialState: InitialStateI = {
  totalNumberPreview: 0,
  previewNumber: 1,
  resultsData: {
    bestResult: [],
    lastResult: [],
    openPreview: [1]
  }
}

const resultsDataSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    getTotalNumberPreview: (state, action: PayloadAction<number>) => {
      state.totalNumberPreview = action.payload
    },
    setOpenPreviewNumber: (state, action: PayloadAction<number>) => {
      state.previewNumber = action.payload
    },
    setResultsData: (state, action: PayloadAction<number>) => {
      const currentArray = state.resultsData.openPreview
      /* если прилетает номер(action.payload) который уже есть в массиве(openPreview) то не добавляет номер в массив. Нужно это для того, что-бы при повторном прохождении этапа массив не заполнялся повторяющимеся числами. */
      if (!currentArray.includes(action.payload)) {
        if (currentArray.length === state.totalNumberPreview) return// не дает превышать размер массива больше чем количество превьюшек
        currentArray.push(action.payload)
      }
    },
    setBestResult: (state, action: PayloadAction<number>) => {
      const bestResult = state.resultsData.bestResult
      const curPrevNum = state.previewNumber-1
      console.log(bestResult[curPrevNum]);
      if (action.payload > bestResult[curPrevNum] || bestResult[curPrevNum] === undefined) {
        bestResult.splice(curPrevNum, 1, action.payload)
      }
      return
    },
    setLastResult: (state, action: PayloadAction<number>) => {
      const lastResult = state.resultsData.lastResult
      const curPrevNum = state.previewNumber-1
      lastResult.splice(curPrevNum, 1, action.payload)
    }
  }
})

export const {setResultsData, setOpenPreviewNumber, getTotalNumberPreview, setBestResult, setLastResult} = resultsDataSlice.actions
export const resultsDataReducer = resultsDataSlice.reducer