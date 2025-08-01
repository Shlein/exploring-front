import { Counter } from 'entities/Counter';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Page } from 'widgets/Page';

function MainPage() {
  const { t } = useTranslation('main');
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <Page>
      {/* <BugButton /> */}
      {t('Главная')}
      <Input
        onChange={handleChange}
        value={value}
        label="Введите текст >"
        placeholder="пример"
      />
      <Counter />
    </Page>
  );
}

export default MainPage;
