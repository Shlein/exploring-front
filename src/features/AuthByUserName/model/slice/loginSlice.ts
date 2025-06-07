import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginTypes';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false,
  error: ''
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setLoginPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginByUsername.pending, state => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.username = action.payload.username;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { setLoginPassword, setLoginUsername } =
  loginSlice.actions;
export const { reducer: LoginReducer } = loginSlice;
