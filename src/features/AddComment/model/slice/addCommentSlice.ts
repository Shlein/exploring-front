import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentSchema } from '../types/addCommentTypes';

const initialState: AddCommentSchema = {
  error: undefined,
  text: ''
};

export const addCommentSlice = createSlice({
  name: 'addComment',
  initialState,
  reducers: {
    setCommentText: (state, { payload }: PayloadAction<string>) => {
      state.text = payload;
    }
  }
});

export const { actions: addCommentActions } = addCommentSlice;
export const { reducer: addCommentReducer } = addCommentSlice;
