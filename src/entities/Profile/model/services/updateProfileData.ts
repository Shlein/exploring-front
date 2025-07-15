import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../types/profileTypes';
import { getProfileForm } from '../selectors/getProfileForm';
import { profileActions } from '../slice/profileSlice';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState, dispatch } = thunkApi;

  const formData = getProfileForm(getState());

  try {
    const response = await extra.api.put<Profile>(
      '/profile',
      formData
    );

    dispatch(profileActions.setProfileReadonly(true));

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue(
      'Не удалось обновить данные вашего профиля'
    );
  }
});
