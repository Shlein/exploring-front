import { FC, useState } from 'react'
import cls from './Sidebar.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = props => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => setCollapsed(prev => !prev)

  return (
    <div className={classNames(cls.sidebar, { [cls.collapsed]: collapsed })}>
      <button onClick={toggleCollapse}>
        {collapsed ? 'Развернуть' : 'Свернуть'}
      </button>
      <div className={cls.swithers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.langSwitcher} />
      </div>
    </div>
  )
}
