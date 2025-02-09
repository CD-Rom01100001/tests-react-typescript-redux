import { configureStore } from "@reduxjs/toolkit";
import {themeReducer, timeReducer} from './slices'

export const store = configureStore({
  reducer: {
    themeIndex: themeReducer,
    timeIndex: timeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch