import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import cls from './Navbar.module.scss';
import { Modal } from 'shared/ui/Modal';
import { Button, ThemeButton } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUserName';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import { getUserAuthData } from 'entities/User/selectors/userSelectors';
import { logout } from 'entities/User/slice/userSlice';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = props => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useAppSelector(getUserAuthData);

  const handleCloseAuth = () => {
    setIsAuthModal(false);
  };

  const handleOpenAuth = () => {
    setIsAuthModal(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (authData) {
    return (
      <div className={classNames(cls.navbar, {}, [className])}>
        <div className={cls.links}>
          <Button theme={ThemeButton.CLEAR} onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <Button theme={ThemeButton.CLEAR} onClick={handleOpenAuth}>
          Войти
        </Button>
        <LoginModal
          isOpen={isAuthModal}
          handleClose={handleCloseAuth}
        />
      </div>
    </div>
  );
};
