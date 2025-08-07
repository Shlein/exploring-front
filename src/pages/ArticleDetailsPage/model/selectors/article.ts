import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetailsSelectors';
import { getUserAuthData } from 'entities/User/selectors/userSelectors';

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }
    return article.user.id === user.id;
  }
);
