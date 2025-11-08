import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggleLaguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames(cls.themeSwither, {}, [className])}
      onClick={toggleLaguage}
    >
      {t('Язык')}
    </Button>
  );
});
