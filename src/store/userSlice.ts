import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  id: string;
}

interface InitialStateI {
  user: UserType | ''
}

const initialState: InitialStateI = {
  user: ''
}

const userDateSlice = createSlice({
  name: 'userDate',
  initialState,
  reducers: {
    getUserDate: (state, action: PayloadAction<UserType | ''>) => {
      state.user = action.payload
    }
  }
})

export const {getUserDate} = userDateSlice.actions
export const userDateReducer = userDateSlice.reducer