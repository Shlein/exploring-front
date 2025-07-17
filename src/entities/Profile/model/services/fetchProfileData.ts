import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../types/profileTypes';

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>('profile/fetchProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Profile>('/profile');

    if (!response.data) {
      throw new Error('Не удалось получить данные о вашем профиле');
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue(
      'Не удалось получить данные о вашем профиле'
    );
  }
});
