import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading.test', () => {
  test('test test', () => {
    const state: DeepPartial<StateSchema> = {
      profile: { isLoading: false }
    };
    expect(getProfileIsLoading(state as StateSchema)).toEqual(false);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileIsLoading(state as StateSchema)).toEqual(
      undefined
    );
  });
});
