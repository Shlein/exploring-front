import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC } from 'react';

import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = props => {
  const { className, children, theme, ...otherProps } = props;
  return (
    <button
      className={classNames(cls.btn, className, { [cls[theme]]: true })}
      {...otherProps}
    >
      {children}
    </button>
  );
};
