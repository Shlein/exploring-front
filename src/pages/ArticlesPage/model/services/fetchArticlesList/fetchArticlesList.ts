import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user'
      }
    });

    if (!response.data) {
      throw new Error('Не удалось загрузить статьи');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('Не удалось загрузить статьи');
  }
});
