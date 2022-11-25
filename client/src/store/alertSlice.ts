import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AlertState {
  type: "inform" | "warning" | undefined,
  message: string | JSX.Element,
}

const initialState: AlertState = {
  type: undefined,
  message: ''
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => ({...action.payload}),
    resetAlert: () => ({...initialState}),
  }
})

export const {setAlert, resetAlert} = alertSlice.actions
export default alertSlice.reducer