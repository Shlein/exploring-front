import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { acticleDetailsRecommendationsReducer } from './ActicleDetailsRecommendationsSlice';
import { articleDetailsCommentsReducer } from './ActicleDetailsCommentsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: acticleDetailsRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
});
