import { Mods, classNames } from 'shared/lib/classNames/classNames';
import {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef
} from 'react';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'readonly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  onChange?: (value: string) => void;
  value?: string | number;
  label?: string;
  autoFocus?: boolean;
  readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    onChange,
    value,
    type = 'text',
    placeholder,
    label,
    autoFocus,
    readonly = false,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      ref?.current?.focus();
    }
  }, [autoFocus]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const mods: Mods = {
    [cls.readonly]: readonly
  };

  return (
    <div className={classNames(cls.Input, mods, [className])}>
      {label && <div className={cls.label}>{`${label} >`}</div>}
      <input
        ref={ref}
        type={type}
        onChange={onChangeHandler}
        value={value}
        className={cls.input}
        placeholder={placeholder}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  );
});
