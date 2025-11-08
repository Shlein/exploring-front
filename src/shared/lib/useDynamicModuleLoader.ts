import { Reducer } from '@reduxjs/toolkit';
import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey
} from '@/app/providers/StoreProvider/config/StateSchema';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';
import { useEffect } from 'react';
import { useStore } from 'react-redux';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

export const useDynamicModuleLoader = (
  reducers: ReducersList,
  removeAfterUnmount: boolean = true
) => {
  const dispatch = useAppDispatch();
  const store = useStore() as ReduxStoreWithManager;
  const mountedReducers = store.reducerManager.getReducerMap();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
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
