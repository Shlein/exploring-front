import {
  CombinedState,
  configureStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { CounterReducer } from 'entities/Counter';
import { UserReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { uiReducer } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
  // navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: CounterReducer,
    user: UserReducer,
    ui: uiReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api
    // navigate
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<
      CombinedState<StateSchema>
    >,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg
        }
      }).concat(rtkApi.middleware)
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
