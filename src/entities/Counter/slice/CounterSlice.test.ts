import { StateSchema } from 'app/providers/StoreProvider';
import { CounterActions, CounterReducer } from './CounterSlice';
import { DeepPartial } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/counterSchema';

describe('CounterSlice.test', () => {
  test('decrement', () => {
    const state: CounterSchema = { value: 5 };
    expect(CounterReducer(state, CounterActions.decrement())).toEqual(
      { value: 4 }
    );
  });

  test('increment', () => {
    const state: CounterSchema = { value: 5 };
    expect(CounterReducer(state, CounterActions.increment())).toEqual(
      { value: 6 }
    );
  });

  test('shoul work with empty state', () => {
    expect(
      CounterReducer(undefined, CounterActions.decrement())
    ).toEqual({ value: -1 });
  });
});
