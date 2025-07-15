import { Select } from 'shared/ui/Select';
import { Currency } from '../model/types/currency';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './CurrencySelect.module.scss';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { name: Currency.RUB, value: Currency.RUB },
  { name: Currency.EUR, value: Currency.EUR },
  { name: Currency.USD, value: Currency.USD }
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, onChange, readonly, value } = props;

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange]
  );

  return (
    <Select
      className={classNames('', {}, [className])}
      label="Укажите валюту"
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
