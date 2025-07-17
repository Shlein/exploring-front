import { Currency } from 'entities/Currency';
import { ProfileErrors, ProfileSchema } from '../types/profileTypes';
import { ProfileReducer, profileActions } from './profileSlice';
import { Country } from 'entities/Country';
import { updateProfileData } from '../services/updateProfileData';

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

describe('profileSlice.test', () => {
  test('set profile readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: true };
    expect(
      ProfileReducer(
        state as ProfileSchema,
        profileActions.setProfileReadonly(true)
      )
    ).toEqual({ readonly: true });
  });
  test('update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { username: '123' }
    };
    expect(
      ProfileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: '123456' })
      )
    ).toEqual({ form: { username: '123456' } });
  });
  test('cancel edit profile', () => {
    const state: DeepPartial<ProfileSchema> = { data };
    expect(
      ProfileReducer(
        state as ProfileSchema,
        profileActions.cancelEditProfile()
      )
    ).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data
    });
  });
  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      validateErrors: [ProfileErrors.SERVER_ERROR]
    };
    expect(
      ProfileReducer(
        state as ProfileSchema,
        updateProfileData.pending
      )
    ).toEqual({ isLoading: true, validateErrors: undefined });
  });

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false
    };
    expect(
      ProfileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '')
      )
    ).toEqual({
      isLoading: false,
      data,
      form: data,
      validateErrors: undefined
    });
  });
});
