import { useTranslation } from 'react-i18next';
import { BugButton } from 'shared/ErrorBoundary';

function MainPage() {
  const { t } = useTranslation('main');
  return (
    <div>
      <BugButton />
      {t('Главная')}
    </div>
  );
}

export default MainPage;
