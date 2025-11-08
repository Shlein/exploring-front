import { FC, memo, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { LangSwitcher } from '@/widgets/LangSwitcher';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import cls from './Sidebar.module.scss';
import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { getSidebarItems } from '@/widgets/Sidebar/model/selectors/getSidebarItems';
import { VStack } from '@/shared/ui/Stack';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(props => {
  const [collapsed, setCollapsed] = useState(true);
  const sidebarItemsList = useAppSelector(getSidebarItems);
  const toggleCollapse = () => setCollapsed(prev => !prev);

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map(item => (
        <SidebarItem
          item={item}
          collapsed={collapsed}
          key={item.path}
        />
      )),
    [collapsed, sidebarItemsList]
  );

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.sidebar, {
        [cls.collapsed]: collapsed
      })}
    >
      <button data-testid="sidebar-toggle" onClick={toggleCollapse}>
        {collapsed ? 'Развернуть' : 'Свернуть'}
      </button>
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <div className={cls.swithers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.langSwitcher} />
      </div>
    </aside>
  );
});
