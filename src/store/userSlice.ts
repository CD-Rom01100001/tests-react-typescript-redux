import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  id: string;
  isAdmin: boolean
}

interface InitialStateI {
  user: UserType | null;
}

const initialState: InitialStateI = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
}

const userDateSlice = createSlice({
  name: 'userDate',
  initialState,
  reducers: {
    getUserDate: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload
    }
  }
})

export const {getUserDate} = userDateSlice.actions
export const userDateReducer = userDateSlice.reducer