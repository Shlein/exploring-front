import { FC, memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUserName';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import { getUserAuthData } from 'entities/User/selectors/userSelectors';
import { logout } from 'entities/User/slice/userSlice';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePaths } from 'shared/config/routerConfig/routerConfig';
import { Dropdown } from 'shared/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';
import { isUserAdmin, isUserManager } from 'entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = memo(props => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useAppSelector(getUserAuthData);
  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;

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
        <Text
          className={cls.appName}
          title="MagerApp"
          theme={TextTheme.INVERTED}
        />
        <AppLink
          className={cls.createLink}
          to={RoutePaths.article_create}
          theme={AppLinkTheme.SECONDARY}
        >
          Создать статью
        </AppLink>
        <Dropdown
          items={[
            ...(isAdminPanelAvailable
              ? [
                  {
                    content: 'Админка',
                    href: RoutePaths.admin_panel
                  }
                ]
              : []),
            {
              content: 'Профиль',
              href: RoutePaths.profile + authData.id
            },
            {
              content: 'Выйти',
              onClick: handleLogout
            }
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
          className={cls.dropdown}
        />
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
});
