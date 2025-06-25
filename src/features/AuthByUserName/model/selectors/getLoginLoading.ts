import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getLoginLoading = (state: StateSchema) =>
  state?.login?.isLoading || false;
