import { CounterSchema } from 'entities/Counter/types/counterSchema';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  login: LoginSchema;
}
