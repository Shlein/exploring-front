import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const selectCounterState = (state: StateSchema) =>
  state.counter;

export const selectCounterValue = createSelector(
  selectCounterState,
  counter => counter.value
);
