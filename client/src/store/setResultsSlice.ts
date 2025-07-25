import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { updateTrainingResults, updateExamResults } from "../api/updatingUserResultServer";
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
  loading: boolean;//!
  error: string | null;//!
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
  index: JSON.parse(localStorage.getItem('examIndex') || '0'),
  loading: false,//!
  error: null//!
}

export const syncTrainingResultsToServer = createAsyncThunk(
  'results/syncTrainingResultsToServer',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;

      const response = await updateTrainingResults(userId, state.resultsDataIndex.resultsTrainingData, token ?? undefined);

      localStorage.setItem("resultsTrainingData", JSON.stringify(response.user.resultsTrainingData));

      return response.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Ошибка синхронизации обучения");
      }
      return thunkAPI.rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const syncExamResultsToServer = createAsyncThunk(
  'results/syncExamResultsToServer',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;

      const response = await updateExamResults(userId, state.resultsDataIndex.resultsExamData, token ?? undefined);

      localStorage.setItem("resultsExamData", JSON.stringify(response.user.resultsExamData));

      return response.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Ошибка синхронизации экзамена");
      }
      return thunkAPI.rejectWithValue("Неизвестная ошибка");
    }
  }
);

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
    /* заполняет массив с последними результатами "lastResult" */
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
        // results[state.index] = currentResult;//!
        // state.index = (state.index + 1) % maxLength;//!

        // saveExamIndex(state.index);//!
        // saveResultsExamToLocalStorage(results);//!
    },
    setResultsData: (
      state,
      action: PayloadAction<{
        resultsTrainingData: ResultData,
        resultsExamData: string[]
      }>
    ) => {
      state.resultsTrainingData = action.payload.resultsTrainingData;
      state.resultsExamData = action.payload.resultsExamData;

      saveResultsTrainingToLocalStorage(state.resultsTrainingData);
      saveResultsExamToLocalStorage(state.resultsExamData);
      saveExamIndex(state.index);
    },
    resetResultsData: (state) => {
      state.trainingLocate = null;
      state.totalNumberPreview = 0;
      state.previewNumber = 1;
      state.resultsTrainingData = {
        bestResult: [],
        lastResult: [],
        openPreview: [1],
      };
      state.resultsExamData = [];
      state.index = 0;
      state.loading = false;
      state.error = null;

      localStorage.removeItem('resultsTrainingData');
      localStorage.removeItem('resultsExamData');
      localStorage.removeItem('examIndex');
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
  setExamHistory,
  setResultsData,
  resetResultsData
} = resultsDataSlice.actions
export const resultsDataReducer = resultsDataSlice.reducer