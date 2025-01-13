import cls from './Navbar.module.scss'
import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = props => {
  const { className } = props
  return (
    <div className={classNames(cls.navbar, className)}>
      <div className={cls.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
          Главная
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/about">О приложении</AppLink>
      </div>
    </div>
  )
}
