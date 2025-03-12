import { configureStore } from "@reduxjs/toolkit";
import {themeReducer, /* idStageReducer */} from './slices'

export const store = configureStore({
  reducer: {
    themeIndex: themeReducer,
    // idStageIndex: idStageReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch