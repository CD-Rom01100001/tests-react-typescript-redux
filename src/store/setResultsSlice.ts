import { createSlice, isAction, PayloadAction } from "@reduxjs/toolkit";

type ResultData = {
  bestResult: '',
  lastResult: '',
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
    bestResult: '',
    lastResult: '',
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
      console.log(state.totalNumberPreview);
      const currentArray = state.resultsData.openPreview
      if (!currentArray.includes(action.payload)) {
        if (currentArray.length === state.totalNumberPreview) return// не дает привышать размер массива больше чем количество превьдшек
        currentArray.push(action.payload)
      }
    }
  }
})

export const {setResultsData, setOpenPreviewNumber, getTotalNumberPreview} = resultsDataSlice.actions
export const resultsDataReducer = resultsDataSlice.reducer