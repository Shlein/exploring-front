import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '@/app/providers/StoreProvider/config/store';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

interface StoreProviderProps {
  children?: ReactNode;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props;

  // const navigate = useNavigate();

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject,
    // navigate
  );

  return <Provider store={store}>{children}</Provider>;
};
