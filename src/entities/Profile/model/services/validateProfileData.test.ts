import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { validateProfileData } from './validateProfileData';
import { ProfileErrors } from '../types/profileTypes';

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

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data);
    expect(result).toEqual([]);
  });

  test('without fname and lname', async () => {
    const result = validateProfileData({
      ...data,
      firstName: '',
      lastName: ''
    });

    expect(result).toEqual([ProfileErrors.INCORRECT_DATA]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: NaN });

    expect(result).toEqual([ProfileErrors.INCORRECT_AGE]);
  });

  test('incorrect all', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ProfileErrors.INCORRECT_DATA,
      ProfileErrors.INCORRECT_AGE
    ]);
  });
});
