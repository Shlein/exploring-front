import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import { RoutePaths } from '@/shared/config/routerConfig/routerConfig';
import {
  useAppDispatch,
  useAppSelector
} from '@/app/providers/StoreProvider/config/hooks';
import { logout } from '@/entities/User/slice/userSlice';
import { isUserAdmin, isUserManager } from '@/entities/User';
import { getUserAuthData } from '@/entities/User/selectors/userSelectors';
import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);
  const authData = useAppSelector(getUserAuthData);

  const isAdminPanelAvailable = isAdmin || isManager;

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!authData) {
    return null;
  }

  return (
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
      direction="bottom left"
      trigger={<Avatar size={30} src={authData.avatar} />}
      className={classNames(cls.dropdown, {}, [className])}
    />
  );
};
