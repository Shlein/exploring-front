import axios from 'axios';
import { loginByUsername } from './loginByUsername';
import { AppDispatch } from '@/app/providers/StoreProvider/config/store';
import { StateSchema } from '@/app/providers/StoreProvider';
import { setAuthData } from '@/entities/User/slice/userSlice';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

describe('loginByUsername.test', () => {
  test('success login', async () => {
    const mockUser = { username: '123', id: '1' };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockResolvedValue({ data: mockUser });
    const result = await thunk.callThunk({
      username: '123',
      password: '123'
    });

    expect(thunk.dispatch).toHaveBeenCalledWith(
      setAuthData(mockUser)
    );
    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockUser);
  });

  test('failed login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockRejectedValue({ response: { status: 403 } });
    const result = await thunk.callThunk({
      username: '123',
      password: '123'
    });

    expect(result.payload).toBe('Не удалось авторизироваться');
    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
  });
  // let dispatch: AppDispatch;
  // let getState: () => StateSchema;
  // const mockUser = { username: '123', id: '1' };

  // beforeEach(() => {
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  // test('success login', async () => {
  //   mockedAxios.post.mockResolvedValue({ data: mockUser });
  //   const action = loginByUsername({
  //     username: '123',
  //     password: '123'
  //   });
  //   const result = await action(dispatch, getState, undefined);
  //   expect(dispatch).toHaveBeenCalledWith(setAuthData(mockUser));
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(dispatch).toHaveBeenCalledTimes(3);
  //   expect(result.meta.requestStatus).toBe('fulfilled');
  //   expect(result.payload).toEqual(mockUser);
  // });

  // test('failed login', async () => {
  //   mockedAxios.post.mockRejectedValue({ response: { status: 403 } });
  //   const action = loginByUsername({
  //     username: '123',
  //     password: '123'
  //   });
  //   const result = await action(dispatch, getState, undefined);

  //   expect(result.payload).toBe('error');
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   expect(result.meta.requestStatus).toBe('rejected');
  // });
});

// expect(dispatch).toHaveBeenCalledTimes(2); // pending → fulfilled

// // Первый вызов - pending
// expect(dispatch.mock.calls[0][0].type).toBe('login/loginByUsername/pending');

// // Второй вызов - fulfilled с данными
// expect(dispatch.mock.calls[1][0].type).toBe('login/loginByUsername/fulfilled');
// expect(dispatch.mock.calls[1][0].payload).toEqual(mockUser);
