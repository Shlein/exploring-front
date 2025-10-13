import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlePage: {
        entities: {},
        pageNumber: 2,
        limit: 5,
        ids: [],
        hasMore: true,
        isLoading: false
      }
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalled();
  });

  test('fetch articleList not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlePage: {
        entities: {},
        pageNumber: 2,
        limit: 5,
        ids: [],
        hasMore: false,
        isLoading: false
      }
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });

  test('fetch articleList not called with isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlePage: {
        entities: {},
        pageNumber: 2,
        limit: 5,
        ids: [],
        hasMore: true,
        isLoading: true
      }
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
