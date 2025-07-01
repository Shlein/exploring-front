import { classNames } from 'shared/lib/classNames/classNames';
import { ISidebarItem } from 'widgets/Sidebar/model/sidebarModel';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: ISidebarItem;
  collapsed?: boolean;
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { item, collapsed } = props;
  return (
    <AppLink theme={AppLinkTheme.SECONDARY} to={item.path}>
      <span>{item.text}</span>
    </AppLink>
  );
};
