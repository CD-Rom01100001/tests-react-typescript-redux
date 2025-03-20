import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  themeSlice: string;
  currentQuestionSlice: number;
  // idStageSlice: number;
}

const initialState: TInitialState = {
  themeSlice: 'Dark',
  currentQuestionSlice: 1,
  // idStageSlice: 0,
}

const themeSlice = createSlice({
  name: 'themes',// имя или название
  initialState,
  /* в редьюсерах мы будем перечислять методы, которые будем в дальнейшем использовать */
  reducers: {
    changeTheme: (state) => {
      if (state.themeSlice === 'Dark') {
        state.themeSlice = 'Light'
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
      else {
        state.themeSlice = 'Dark'
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
      }
      
    }
  }
})

const currentQuestionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    getCurrentQuestion: (state, action: PayloadAction<number>) => {
      // let x = state.currentQuestionSlice
      // x = action.payload
      // console.log(x);

      state.currentQuestionSlice = action.payload
    }
  }
})

export const {changeTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer

export const {getCurrentQuestion} = currentQuestionSlice.actions
export const currentQuestionReducer = currentQuestionSlice.reducer