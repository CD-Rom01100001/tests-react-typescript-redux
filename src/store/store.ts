import { configureStore } from "@reduxjs/toolkit";
import {
  themeReducer, 
  currentQuestionIdReducer, 
  sectionNumReducer, 
  alertTrainingReducer,
  indicatorIdReducer,
} from './slices'

export const store = configureStore({
  reducer: {
    themeIndex: themeReducer,
    currentQuestionIdIndex: currentQuestionIdReducer,
    sectionNumIndex: sectionNumReducer,
    alertTrainingIndex: alertTrainingReducer,
    indicatorIdIndex: indicatorIdReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch