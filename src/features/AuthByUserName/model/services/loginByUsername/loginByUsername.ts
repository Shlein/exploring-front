import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User';
import { setAuthData } from 'entities/User/slice/userSlice';
import { USER_AUTH_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>('login/loginByUsername', async (authData, thunkAPI) => {
  try {
    const response = await axios.post<User>(
      'http://localhost:8000/login',
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(response.data));
    thunkAPI.dispatch(setAuthData(response.data));

    return response.data;
  } catch (e) {
    thunkAPI.rejectWithValue('Вы ввели неверный логин или пароль');
  }
});
