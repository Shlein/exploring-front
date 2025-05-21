import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import cls from './Navbar.module.scss';
import { Modal } from 'shared/ui/Modal';
import { Button, ThemeButton } from 'shared/ui/Button';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = props => {
  const { className } = props;
  const [isAuth, setIsAuth] = useState(false);

  const onToggleAuth = () => {
    setIsAuth(prev => !prev);
  };

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        {/* <AppLink theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
          Главная
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/about">
          О приложении
        </AppLink> */}
        <Button theme={ThemeButton.CLEAR} onClick={onToggleAuth}>
          Войти
        </Button>
        <Modal isOpen={isAuth} onClose={onToggleAuth}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eaque corporis nihil minus eveniet voluptates voluptas a
          illum, quia error nisi nostrum blanditiis temporibus
          voluptate ullam possimus, tempore magni aperiam aliquid?
        </Modal>
      </div>
    </div>
  );
};
