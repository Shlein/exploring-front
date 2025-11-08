import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleById } from './fetchArticleById';
import { Article } from '@/entities/Article/model/types/ArticleDetailsTypes';
import {
  ArticleBlockType,
  ArticleType
} from '@/entities/Article/consts/consts';

const data: Article = {
  id: '1',
  title: 'title',
  subtitle: 'subtitle',
  type: [ArticleType.ECONOMICS],
  img: 'img.jpg',
  user: {
    id: '1',
    username: 'admin',
    avatar:
      'https://i.pinimg.com/736x/19/84/51/1984513c5e878058cd1ae6b2dcde64f8.jpg'
  },
  blocks: [
    {
      id: '1',
      paragraphs: ['sffs'],
      type: ArticleBlockType.TEXT
    }
  ],
  createdAt: '12.12.2012',
  views: 4
};

describe('fetchArticleById.test', () => {
  test('success get article by id', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockResolvedValue({ data });
    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('failed get article by id', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockRejectedValue({ response: { status: 403 } });
    const result = await thunk.callThunk('1');

    expect(result.payload).toBe(
      'Не удалось получить данные о статье'
    );
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
