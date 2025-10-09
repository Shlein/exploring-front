import { Counter } from 'entities/Counter';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'shared/ui/Dropdown';
import { Input } from 'shared/ui/Input/Input';
import { ListBox } from 'shared/ui/ListBox';
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
      <ListBox
        defaultValue="Выберите значение"
        onChange={(value: string) => {}}
        items={[
          { content: 'Вася', value: 'Вася' },
          { content: 'Коля', value: 'Коля', disabled: true },
          { content: 'Диана', value: 'Диана' }
        ]}
        value={undefined}
      />
      <Dropdown
        items={[
          { content: 'Вася', onClick: () => {} },
          { content: 'Коля', onClick: () => {} },
          { content: 'Диана', onClick: () => {} }
        ]}
        trigger={'Дропани'}
        direction="top left"
      />
      <Counter />
    </Page>
  );
}

export default MainPage;
