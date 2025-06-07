import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'app/providers/StoreProvider/config/hooks';
import {
  setLoginPassword,
  setLoginUsername
} from 'features/AuthByUserName/model/slice/loginSlice';
import { getLoginState } from 'features/AuthByUserName/model/selectors/loginSelectors';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { loginByUsername } from 'features/AuthByUserName/model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { username, password, isLoading, error } =
    useSelector(getLoginState);

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
