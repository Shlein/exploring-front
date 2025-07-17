import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileErrors } from '../types/profileTypes';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
  test('test test', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ProfileErrors.INCORRECT_AGE,
          ProfileErrors.INCORRECT_DATA
        ]
      }
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ProfileErrors.INCORRECT_AGE,
      ProfileErrors.INCORRECT_DATA
    ]);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(
      undefined
    );
  });
});
