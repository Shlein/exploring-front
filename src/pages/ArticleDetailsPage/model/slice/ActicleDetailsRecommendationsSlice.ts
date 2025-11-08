import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId';
import { ArticleDetailsRecommendationsSchema } from '../types/ActicleDetailsRecommendationsSchema';
import { Article } from '@/entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: article => article.id
});

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    state =>
      state.articleDetailsPage?.recommendations ||
      recommendationsAdapter.getInitialState()
  );

const ActicleDetailsRecommendationsSlice = createSlice({
  name: 'acticleDetailsRecommendationsSlice',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
      }
    ),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchArticleRecommendations.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleRecommendations.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          recommendationsAdapter.setAll(state, action.payload);
        }
      )
      .addCase(
        fetchArticleRecommendations.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { reducer: acticleDetailsRecommendationsReducer } =
  ActicleDetailsRecommendationsSlice;
