import { FC, memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import cls from './Sidebar.module.scss';
import { useAppSelector } from 'app/providers/StoreProvider/config/hooks';
import { getSidebarItems } from 'widgets/Sidebar/model/selectors/getSidebarItems';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(props => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useAppSelector(getSidebarItems);
  const toggleCollapse = () => setCollapsed(prev => !prev);

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, {
        [cls.collapsed]: collapsed
      })}
    >
      <button data-testid="sidebar-toggle" onClick={toggleCollapse}>
        {collapsed ? 'Развернуть' : 'Свернуть'}
      </button>
      {sidebarItemsList.map(item => (
        <SidebarItem item={item} key={item.path} />
      ))}
      <div className={cls.swithers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.langSwitcher} />
      </div>
    </div>
  );
});
