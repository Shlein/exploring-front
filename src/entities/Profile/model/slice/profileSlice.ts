import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profileTypes';
import { fetchProfileData } from '../services/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData';

const initialState: ProfileSchema = {
  isLoading: false,
  readonly: true,
  data: undefined,
  error: undefined,
  validateErrors: undefined
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = { ...state.form, ...action.payload };
    },
    cancelEditProfile: state => {
      state.readonly = true;
      state.validateErrors = undefined;
      state.form = state.data;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfileData.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.form = action.payload;
        }
      )
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProfileData.pending, state => {
        state.validateErrors = undefined;
        state.isLoading = true;
      })
      .addCase(
        updateProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.form = action.payload;
          state.validateErrors = undefined;
        }
      )
      .addCase(updateProfileData.rejected, (state, action) => {
        state.validateErrors = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: profileActions } = profileSlice;
export const { reducer: ProfileReducer } = profileSlice;
