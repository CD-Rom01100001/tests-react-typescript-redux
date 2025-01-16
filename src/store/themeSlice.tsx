import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  themeSlice: string
}

const initialState: InitialStateType = {
  themeSlice: 'Dark'
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

export const {changeTheme} = themeSlice.actions

export const themeReducer = themeSlice.reducer