import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/entities/User';
import { setAuthData } from '@/entities/User/slice/userSlice';
import { USER_AUTH_KEY } from '@/shared/const/localStorage';
import {
  ThunkConfig,
  ThunkExtraArg
} from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>(
  'login/loginByUsername',
  async (authData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<User>('/login', authData);

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(
        USER_AUTH_KEY,
        JSON.stringify(response.data)
      );
      dispatch(setAuthData(response.data));

      // extra.navigate('/about');

      return response.data;
    } catch (e) {
      return rejectWithValue('Не удалось авторизироваться');
    }
  }
);
