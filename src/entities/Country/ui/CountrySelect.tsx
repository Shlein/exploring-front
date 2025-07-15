import { Select } from 'shared/ui/Select';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './CurrencySelect.module.scss';
import { Country } from '../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { name: Country.Armenia, value: Country.Armenia },
  { name: Country.Belarus, value: Country.Belarus },
  { name: Country.Georgia, value: Country.Georgia },
  { name: Country.Russia, value: Country.Russia }
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
    <Select
      className={classNames('', {}, [className])}
      label="Укажите государство"
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
