import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { updateProfileData } from './updateProfileData';
import { ProfileErrors } from '../types/profileTypes';

const data = {
  id: '',
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

describe('updateProfileData.test', () => {
  test('success update profile', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data }
    });
    thunk.api.put.mockResolvedValue({ data });
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('failed update profile', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data }
    });
    thunk.api.put.mockRejectedValue({ response: { status: 403 } });
    const result = await thunk.callThunk();

    expect(result.payload).toEqual([ProfileErrors.SERVER_ERROR]);
    expect(result.meta.requestStatus).toBe('rejected');
  });

  test('validate error during updating profile', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: { ...data, age: undefined } }
    });
    thunk.api.put.mockRejectedValue({ response: { status: 403 } });
    const result = await thunk.callThunk();

    expect(result.payload).toEqual([ProfileErrors.INCORRECT_AGE]);
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
