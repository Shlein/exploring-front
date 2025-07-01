import { createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profileTypes';
import { Country, Currency } from 'shared/const/common';

const initialState: ProfileSchema = {
  isLoading: false,
  readonly: true,
  data: undefined,
  error: undefined
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {}
});

export const { actions: ProfileActions } = profileSlice;
export const { reducer: ProfileReducer } = profileSlice;
