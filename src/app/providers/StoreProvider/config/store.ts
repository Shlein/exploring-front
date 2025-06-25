import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { CounterReducer } from 'entities/Counter';
import { UserReducer } from 'entities/User';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: CounterReducer,
    user: UserReducer
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<
  typeof createReduxStore
>['dispatch'];
export type AppStore = ReturnType<typeof createReduxStore>;
export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
