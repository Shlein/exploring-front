import { Counter } from 'entities/Counter';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';

function MainPage() {
  const { t } = useTranslation('main');
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <div>
      {/* <BugButton /> */}
      {t('Главная')}
      <Input
        onChange={handleChange}
        value={value}
        label="Введите текст >"
        placeholder="пример"
      />
      <Counter />
    </div>
  );
}

export default MainPage;
