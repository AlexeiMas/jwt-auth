import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../store/userSlice'
import alertReducer from '../store/alertSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch