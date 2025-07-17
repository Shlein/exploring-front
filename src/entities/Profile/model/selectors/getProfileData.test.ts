import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

describe('getProfileData', () => {
  test('common get profile data', () => {
    const data = {
      firstName: 'admin',
      lastName: 'adminovich',
      age: 26,
      currency: Currency.RUB,
      country: Country.Armenia,
      city: 'NY',
      username: 'loh',
      avatar: 'afllf.png'
    };
    const state: DeepPartial<StateSchema> = { profile: { data } };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
