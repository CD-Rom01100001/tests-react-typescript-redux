import { configureStore } from "@reduxjs/toolkit";
import {
  themeReducer, 
  currentQuestionIdReducer, 
  sectionNumReducer, 
  alertTrainingReducer,
  indicatorIdReducer,
  setAnswersReducer,
  defineEndTestReducer,
  registrationWindowReducer,
  loginWindowReducer,
  resetTimeReducer,
} from './slices'
import {resultsDataReducer} from './setResultsSlice'

export const store = configureStore({
  reducer: {
    themeIndex: themeReducer,
    currentQuestionIdIndex: currentQuestionIdReducer,
    sectionNumIndex: sectionNumReducer,
    alertTrainingIndex: alertTrainingReducer,
    indicatorIdIndex: indicatorIdReducer,
    arrayAnswersIndex: setAnswersReducer,
    defineEndTestIndex: defineEndTestReducer,
    registrationWindowIndex: registrationWindowReducer,
    loginWindowReducerIndex: loginWindowReducer,
    resetTimeIndex: resetTimeReducer,
    resultsDataIndex: resultsDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch