import { FC, memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { SidebarItemsList } from 'widgets/Sidebar/model/sidebarModel';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(props => {
  const [collapsed, setCollapsed] = useState(false);
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
      {SidebarItemsList.map(item => (
        <SidebarItem item={item} key={item.path} />
      ))}
      <div className={cls.swithers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.langSwitcher} />
      </div>
    </div>
  );
});
