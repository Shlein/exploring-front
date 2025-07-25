import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article/model/types/ArticleDetailsTypes';

export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article>(
      `/articles/${articleId}`
    );

    if (!response.data) {
      throw new Error('Не удалось получить данные о статье');
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('Не удалось получить данные о статье');
  }
});
