import { createSlice } from "@reduxjs/toolkit";

interface InitialStateI {
  window: boolean;
}

const initialState: InitialStateI = {
  window: false
}

const userWindowSlice = createSlice({
  name: 'userWindow',// name - обычно совпадает с названием slice
  initialState,
  reducers: {
    /* setStateUserWindow - название редьюсера */
    setStateUserWindow: (state) => {
      state.window = !state.window
    }
  }
})

export const {setStateUserWindow} = userWindowSlice.actions
export const userWindowReducer = userWindowSlice.reducer
