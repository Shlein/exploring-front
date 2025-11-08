import { Currency } from '../model/types/currency';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups/ui/ListBox';

import cls from './CurrencySelect.module.scss';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD }
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
    <ListBox
      className={classNames('', {}, [className])}
      defaultValue="Выберите валюту"
      label="Выберите валюту"
      onChange={onChangeHandler}
      items={options}
      value={value}
      readonly={readonly}
      direction="top right"
    />
    // <Select
    //   className={classNames('', {}, [className])}
    //   label="Укажите валюту"
    //   options={options}
    //   value={value}
    //   onChange={onChangeHandler}
    //   readonly={readonly}
    // />
  );
});
