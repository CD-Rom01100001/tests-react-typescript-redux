import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  themeSlice: string;
  currentQuestionIdSlice: number;
  currentSectionNum: number;
  stateAlert: string;
  currentIndicatorId: number;
}

const initialState: TInitialState = {
  themeSlice: 'Dark',
  currentQuestionIdSlice: 0,
  currentSectionNum: 0,
  stateAlert: 'close',
  currentIndicatorId: 0,
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

const currentQuestionIdSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    getCurrentQuestionId: (state, action: PayloadAction<number>) => {
      state.currentQuestionIdSlice = action.payload
    }
  }
})

const sectionNum = createSlice({
  name: 'sectionNumber',
  initialState,
  reducers: {
    getSectionNum: (state, action: PayloadAction<number>) => {
      state.currentSectionNum = action.payload
    }
  }
})

const alertTraining = createSlice({
  name: 'alertTraining',
  initialState,
  reducers: {
    setStateAlert: (state, action: PayloadAction<string>) => {
      state.stateAlert = action.payload
    }
  }
})
/* ID индикатора */
const indicatorId = createSlice({
  name: 'indicator ID',
  initialState,
  reducers: {
    getIndicatorId: (state, action: PayloadAction<number>) => {
      state.currentIndicatorId = action.payload
    } 
  }
})

export const {changeTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer

export const {getCurrentQuestionId} = currentQuestionIdSlice.actions
export const currentQuestionIdReducer = currentQuestionIdSlice.reducer

export const {getSectionNum} = sectionNum.actions
export const sectionNumReducer = sectionNum.reducer

export const {setStateAlert} = alertTraining.actions
export const alertTrainingReducer = alertTraining.reducer

/* ID индикатора */
export const {getIndicatorId} = indicatorId.actions
export const indicatorIdReducer = indicatorId.reducer
