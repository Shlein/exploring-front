import { Select } from 'shared/ui/Select';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './CurrencySelect.module.scss';
import { Country } from '../model/types/country';
import { ListBox } from 'shared/ui/ListBox';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Georgia, content: Country.Georgia },
  { value: Country.Russia, content: Country.Russia }
];

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, onChange, readonly, value } = props;

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );

  return (
    <ListBox
      className={classNames('', {}, [className])}
      defaultValue="Выберите государство"
      label="Выберите валюту"
      onChange={onChangeHandler}
      items={options}
      value={value}
      readonly={readonly}
      direction="top right"
    />
    // <Select
    //   className={classNames('', {}, [className])}
    //   label="Укажите государство"
    //   options={options}
    //   value={value}
    //   onChange={onChangeHandler}
    //   readonly={readonly}
    // />
  );
});
