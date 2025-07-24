import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

const data = {
  firstName: 'Данchik',
  lastName: 'Shlein',
  age: 26,
  currency: Currency.RUB,
  country: Country.Georgia,
  city: 'Gomsk',
  username: 'admin',
  avatar:
    'https://i.pinimg.com/736x/19/84/51/1984513c5e878058cd1ae6b2dcde64f8.jpg'
};

describe('fetchProfileData.test', () => {
  test('success get profile', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockResolvedValue({ data });
    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('failed get profile', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockRejectedValue({ response: { status: 403 } });
    const result = await thunk.callThunk('1');

    expect(result.payload).toBe(
      'Не удалось получить данные о вашем профиле'
    );
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
