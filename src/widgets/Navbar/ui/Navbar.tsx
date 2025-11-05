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
import { Dropdown } from 'shared/ui/Popups/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';
import { isUserAdmin, isUserManager } from 'entities/User';
import { HStack } from 'shared/ui/Stack';
import { Icon } from 'shared/ui/Icon';
import NotificationSvg from 'shared/assets/icons/notification.svg';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Notification';
import cls from './Navbar.module.scss';
import { NotificationButton } from 'features/notificationButton';
import { AvatarDropdown } from 'features/avatarDropdown';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = memo(props => {
  const { className } = props;
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useAppSelector(getUserAuthData);

  const handleCloseAuth = () => {
    setIsAuthModal(false);
  };

  const handleOpenAuth = () => {
    setIsAuthModal(true);
  };

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
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
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </div>
    );
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
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
