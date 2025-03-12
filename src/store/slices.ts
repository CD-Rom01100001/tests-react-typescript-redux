import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  themeSlice: string;
  // idStageSlice: number;
}

const initialState: TInitialState = {
  themeSlice: 'Dark',
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

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
   //
  }
})

// const idStageSlice = createSlice({
//   name: 'pages',
//   initialState,
//   reducers: {
//     getListPageId: (state, {payload}) => {
//       state.idStageSlice = payload
//     }
//   }
// })

export const {changeTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer

// export const {getListPageId} = idStageSlice.actions
// export const idStageReducer = idStageSlice.reducer