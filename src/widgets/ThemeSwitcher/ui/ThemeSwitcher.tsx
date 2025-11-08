import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import DarkThemeIcon from '@/shared/assets/icons/theme-dark.svg';
import LightThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { memo } from 'react';

import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(
  ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
      <Button
        theme={ThemeButton.CLEAR}
        className={classNames(cls.themeSwither, {}, [className])}
        onClick={toggleTheme}
      >
        {theme === Theme.DARK ? (
          <DarkThemeIcon />
        ) : (
          <LightThemeIcon />
        )}
      </Button>
    );
  }
);
