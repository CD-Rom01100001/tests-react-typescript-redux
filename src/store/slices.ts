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
  path: string;
  endTime: boolean;
  stateExitAlert: string;
  currentIndicatorId: number;
  arrayAnswers: (ObjInfoSelectedAnswerType | null)[];
  openStages: number;
  defineEnd: boolean;
  registration: boolean;
  openWindow: boolean;
  timeKey: number;
}

const initialState: TInitialState = {
  themeSlice: JSON.parse(localStorage.getItem('theme') || '"Dark"'),
  currentQuestionIdSlice: 0,
  currentSectionNum: 0,
  stateAlert: 'close',//open/close
  path: '/',
  endTime: false,
  stateExitAlert: 'close',//open/close
  currentIndicatorId: 0,
  arrayAnswers: [],
  openStages: 1,
  defineEnd: false,
  registration: true,
  openWindow: false,
  timeKey: 0
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
        localStorage.setItem('theme', JSON.stringify(state.themeSlice))
      }
      else {
        state.themeSlice = 'Dark'
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', JSON.stringify(state.themeSlice))
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
    },
    setEndTime: (state, action: PayloadAction<boolean>) => {
      state.endTime = action.payload
    },
    setPath:  (state, action: PayloadAction<string>) => {
      state.path = action.payload
    },
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
    },
    /* очищает массив с ответами */
    clearAnswers: (state) => {
      state.arrayAnswers = []
    },
    /*  */
    setOpenStages: (state, action: PayloadAction<number>) => {
      state.openStages = action.payload
    }
  }
})
/* определяет закончин ли тест или нет (нжата кнопка "результат" или нет) */
const qAEnd = createSlice({
  name: 'defines the end of the test',
  initialState,
  reducers: {
    defineEndTest: (state, action: PayloadAction<boolean>) => {
      state.defineEnd = action.payload;
    }
  }
})
/* зарегистрирован или нет */
const registration = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    registeredOrNot: (state, action: PayloadAction<boolean>) => {
      state.registration = action.payload;
    },
    openEntryWindow: (state, action: PayloadAction<boolean>) => {
      state.openWindow = action.payload
    }
  }
})
/* управление временем */
const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    resetTime: (state) => {
      state.timeKey += 1;
    },
  },
});

export const {changeTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer

export const {getCurrentQuestionId} = currentQuestionIdSlice.actions
export const currentQuestionIdReducer = currentQuestionIdSlice.reducer

export const {getSectionNum} = sectionNum.actions
export const sectionNumReducer = sectionNum.reducer

export const {setStateAlert, setEndTime, setPath} = alertTraining.actions
export const alertTrainingReducer = alertTraining.reducer

/* ID индикатора */
export const {getIndicatorId} = indicatorId.actions
export const indicatorIdReducer = indicatorId.reducer

/* массив ответов */
export const {setAnswers, setFullAnswers, clearAnswers, setOpenStages} = arrayAnswers.actions
export const setAnswersReducer = arrayAnswers.reducer

export const {defineEndTest} = qAEnd.actions
export const defineEndTestReducer = qAEnd.reducer

export const {registeredOrNot, openEntryWindow} = registration.actions
export const registeredOrNotReducer = registration.reducer

export const { resetTime } = timeSlice.actions;
export const resetTimeReducer = timeSlice.reducer;