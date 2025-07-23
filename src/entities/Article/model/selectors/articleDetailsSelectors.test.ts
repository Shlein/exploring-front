import { StateSchema } from 'app/providers/StoreProvider';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from './articleDetailsSelectors';
import {
  ArticleBlockType,
  ArticleType
} from '../types/ArticleDetailsTypes';

describe('getArticleDetailsSelectors.test', () => {
  test('get article data', () => {
    const data = {
      id: '1',
      title: 'aa'
    };
    const state: DeepPartial<StateSchema> = {
      articleDetails: { data }
    };
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test('get article isloading true', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: { isLoading: true }
    };
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(
      true
    );
  });

  test('get article isloading with empry state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(
      false
    );
  });

  test('get article error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: { error: 'error' }
    };
    expect(getArticleDetailsError(state as StateSchema)).toEqual(
      'error'
    );
  });

  test('get article error with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleDetailsError(state as StateSchema)).toEqual(
      undefined
    );
  });
});
