import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import {
  LoginReducer,
  setLoginPassword,
  setLoginUsername
} from 'features/AuthByUserName/model/slice/loginSlice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { loginByUsername } from 'features/AuthByUserName/model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useAppDispatch } from 'app/providers/StoreProvider/config/hooks';
import { getLoginError } from 'features/AuthByUserName/model/selectors/getLoginError';
import { getLoginUsername } from 'features/AuthByUserName/model/selectors/getLoginUsername';
import { getLoginPassword } from 'features/AuthByUserName/model/selectors/getLoginPassword';
import { getLoginLoading } from 'features/AuthByUserName/model/selectors/getLoginLoading';
import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
}

const initialReducers: ReducersList = {
  login: LoginReducer
};

const LoginForm = (props: LoginFormProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);

  useDynamicModuleLoader(initialReducers, true);

  const handleUsername = useCallback(
    (value: string) => dispatch(setLoginUsername(value)),
    [dispatch]
  );

  const handlePassword = useCallback(
    (value: string) => dispatch(setLoginPassword(value)),
    [dispatch]
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title="Форма авторизации" />
      {error && <Text theme={TextTheme.ERROR} text={error} />}
      <Input
        className={cls.input}
        label="Введите логин"
        placeholder="username"
        type="text"
        autoFocus
        onChange={handleUsername}
        value={username}
      />
      <Input
        className={cls.input}
        label="Введите пароль"
        placeholder="password"
        type="text"
        onChange={handlePassword}
        value={password}
      />
      <Button
        onClick={onLoginClick}
        theme={ThemeButton.OUTLINE}
        className={cls.submitButton}
        disabled={isLoading}
      >
        Войти
      </Button>
    </div>
  );
};

export default LoginForm;
