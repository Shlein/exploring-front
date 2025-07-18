import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/userTypes';
import { USER_AUTH_KEY } from 'shared/const/localStorage';

const initialState: UserSchema = { _inited: false };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: state => {
      const user = localStorage.getItem(USER_AUTH_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
      state._inited = true;
    },
    logout: state => {
      state.authData = undefined;
      localStorage.removeItem(USER_AUTH_KEY);
    }
  }
});

export const { setAuthData, initAuthData, logout } =
  userSlice.actions;
export const { reducer: UserReducer } = userSlice;
