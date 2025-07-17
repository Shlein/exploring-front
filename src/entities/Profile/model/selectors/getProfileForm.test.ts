import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

describe('getProfileForm.test', () => {
  test('common get profile form', () => {
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
    const state: DeepPartial<StateSchema> = {
      profile: { form: data }
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
