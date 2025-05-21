import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { CounterReducer } from 'entities/Counter/slice/CounterSlice';

export function createReduxStore(initialState: StateSchema) {
  return configureStore<StateSchema>({
    reducer: { counter: CounterReducer },
    devTools: __IS_DEV__,
    preloadedState: initialState
  });
}

// export const store = createReduxStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
