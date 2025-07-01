import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState
} from 'react';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
  label?: string;
  autoFocus?: boolean;
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
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={classNames(cls.Input, {}, [className])}>
      {label && <div className={cls.label}>{label}</div>}
      <input
        ref={ref}
        type={type}
        onChange={onChangeHandler}
        value={value}
        className={cls.input}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  );
});
