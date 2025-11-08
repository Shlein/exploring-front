import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginLoading } from './getLoginLoading';

describe('getLoginLoading.test', () => {
  test('should return is loading', () => {
    const state: DeepPartial<StateSchema> = {
      login: { isLoading: false }
    };
    expect(getLoginLoading(state as StateSchema)).toEqual(false);
  });
});
