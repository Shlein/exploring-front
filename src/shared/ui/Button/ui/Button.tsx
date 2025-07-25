import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, memo } from 'react';
import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline'
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  children: React.ReactNode;
  disabled?: boolean;
  // size: SizeButton
  // потом добавить размеры для кнопок
}

export const Button: FC<ButtonProps> = memo(props => {
  const {
    className,
    children,
    theme = ThemeButton.OUTLINE,
    disabled = false,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls[theme]]: true,
    // [cls.square]: square,
    // [cls[size]]: true,
    [cls.disabled]: disabled
  };

  return (
    <button
      type="button"
      className={classNames(cls.Button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
