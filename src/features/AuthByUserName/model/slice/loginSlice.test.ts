import { LoginSchema } from '../types/loginTypes';
import {
  LoginReducer,
  setLoginPassword,
  setLoginUsername
} from './loginSlice';

describe('loginSlice.test', () => {
  test('set login username', () => {
    const state: Partial<LoginSchema> = {
      username: '123'
    };
    expect(
      LoginReducer(state as LoginSchema, setLoginUsername('123123'))
    ).toEqual({ username: '123123' });
  });
  test('set user password', () => {
    const state: Partial<LoginSchema> = {
      password: ''
    };
    expect(
      LoginReducer(state as LoginSchema, setLoginPassword('password'))
    ).toEqual({ password: 'password' });
  });
});
