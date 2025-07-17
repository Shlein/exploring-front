import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ProfileErrors } from '../types/profileTypes';
import { getProfileForm } from '../selectors/getProfileForm';
import { profileActions } from '../slice/profileSlice';
import { validateProfileData } from './validateProfileData';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ProfileErrors[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState, dispatch } = thunkApi;
  const formData = getProfileForm(getState());

  const validateErrors = validateProfileData(formData);

  if (validateErrors?.length) {
    return rejectWithValue(validateErrors);
  }

  try {
    const response = await extra.api.put<Profile>(
      '/profile',
      formData
    );

    if (!response.data) {
      throw new Error('Не удалось обновить данные вашего профиля');
    }

    dispatch(profileActions.setProfileReadonly(true));

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue([ProfileErrors.SERVER_ERROR]);
  }
});
