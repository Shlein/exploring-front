// export interface CounterState {
//   value: number;
// }

import { CounterSchema } from 'entities/Counter/types/counterSchema';

export interface StateSchema {
  counter: CounterSchema;
}
