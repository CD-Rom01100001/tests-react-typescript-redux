import { configureStore } from "@reduxjs/toolkit";
import {themeReducer} from './themeSlice'

export const store = configureStore({
  reducer: {
    themeIndex: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch