import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Article } from '../types/ArticleDetailsTypes';
import { ArticleDetailsSchema } from '../types/ArticleDetailsSchema';
import { fetchArticleById } from '@/entities/Article/services/fetchArticleById/fetchArticleById';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined
};

export const acticleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {
    setArticleData: (state, action: PayloadAction<Article>) => {
      state.data = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticleById.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: ArticleDetailsActions } = acticleDetailsSlice;
export const { reducer: ArticleDetailsReducer } = acticleDetailsSlice;
