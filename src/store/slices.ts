import { defineConfig } from 'vite';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ObjInfoSelectedAnswerType = {
  questionId: number | null;
  answerId: number | null;
  correct: boolean | null;
}

type TInitialState = {
  themeSlice: string;
  currentQuestionIdSlice: number;
  currentSectionNum: number;
  stateAlert: string;
  currentIndicatorId: number;
  arrayAnswers: (ObjInfoSelectedAnswerType | null)[];
  defineEnd: boolean
}

const initialState: TInitialState = {
  themeSlice: 'Dark',
  currentQuestionIdSlice: 0,
  currentSectionNum: 0,
  stateAlert: 'close',
  currentIndicatorId: 0,
  arrayAnswers: [],
  defineEnd: false
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
/* массив ответов */
const arrayAnswers = createSlice({
  name: 'array answers',
  initialState,
  reducers: { 
    setAnswers: (
      state, 
      action: PayloadAction<{index: number; value: ObjInfoSelectedAnswerType}>
    ) => {
      const {index, value} = action.payload
      // Создаём новый массив на основе текущего состояния
      const newAnswers = [...state.arrayAnswers]
      // Заполняем пропущенные элементы null
      while (newAnswers.length <= index) {
        newAnswers.push(null)
      }
      // Вставляем новое значение
      newAnswers[index] = value
      // Обновляем состояние
      state.arrayAnswers = newAnswers
    },
    setFullAnswers: (state, action: PayloadAction<(ObjInfoSelectedAnswerType | null)[]>) => {
      state.arrayAnswers = action.payload
    }
  }
})
const qAEnd = createSlice({
  name: 'defines the end of the test',
  initialState,
  reducers: {
    defineEndTest: (state, action: PayloadAction<boolean>) => {
      state.defineEnd = action.payload;
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

/* массив ответов */
export const {setAnswers, setFullAnswers} = arrayAnswers.actions
export const setAnswersReducer = arrayAnswers.reducer

export const {defineEndTest} = qAEnd.actions
export const defineEndTestReducer = qAEnd.reducer
