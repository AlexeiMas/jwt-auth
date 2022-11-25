import {IUser} from "../models/IUser";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import axios, {AxiosError} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

interface UserState {
  user: IUser | undefined,
  isAuth: boolean,
  isLoading: boolean
}

const initialState: UserState = {
  user: undefined,
  isAuth: Boolean(localStorage.getItem('accessToken')) ?? false,
  isLoading: false
}

export const userLogin = createAsyncThunk(
  'user/login',
  async ({email, password}: { email: string, password: string }) => {
    try {
      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('accessToken', response.data.accessToken)
      return response.data
    } catch (err) {
      const errors = err as Error | AxiosError
      if (!axios.isAxiosError(errors)) {
        console.log(errors)
      } else {
        console.log(errors.response?.data?.message)
        return errors.response?.data?.message
      }
    }
  }
)
export const userSignUp = createAsyncThunk(
  'user/signup',
  async ({email, password}: { email: string, password: string }) => {
    try {
      const response = await AuthService.registration(email, password)
      console.log(response)
      localStorage.setItem('accessToken', response.data.accessToken)
      return response.data
    } catch (err) {
      const errors = err as Error | AxiosError
      if (!axios.isAxiosError(errors)) {
        console.log(errors)
      } else {
        console.log(errors.response?.data?.message)
      }
    }
  }
)
export const userLogout = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      const response = await AuthService.logout()
      console.log(response)
      localStorage.removeItem('accessToken')
    } catch (err) {
      const errors = err as Error | AxiosError
      if (!axios.isAxiosError(errors)) {
        console.log(errors)
      } else {
        console.log(errors.response?.data?.message)
      }
    }
  }
)
export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('accessToken', response.data.accessToken)
      return response.data
    } catch (err) {
      const errors = err as Error | AxiosError
      if (!axios.isAxiosError(errors)) {
        console.log(errors)
      } else {
        console.log(errors.response?.data?.message)
      }
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      action?.payload && (state.isAuth = true)
      state.user = action?.payload?.user
    })
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.isAuth = true
      state.user = action?.payload?.user
    })
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isAuth = false
      state.user = {} as IUser
    })
    builder.addCase(checkAuth.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuth = true
      state.user = action?.payload?.user
      state.isLoading = false
    })
  }
})

export const {setAuth, setUser} = userSlice.actions

export default userSlice.reducer