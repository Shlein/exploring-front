import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getLoginError = (state: StateSchema) =>
  state?.login?.error || '' || undefined;
