import { Reducer } from '@reduxjs/toolkit';
import {
  ReduxStoreWithManager,
  StateSchemaKey
} from 'app/providers/StoreProvider/config/StateSchema';
import { useAppDispatch } from 'app/providers/StoreProvider/config/hooks';
import { useEffect } from 'react';
import { useStore } from 'react-redux';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

export const useDynamicModuleLoader = (
  reducers: ReducersList,
  removeAfterUnmount: boolean = true
) => {
  const dispatch = useAppDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, []);
};
