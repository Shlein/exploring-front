import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { FC, forwardRef, memo } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red'
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = memo(
  forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
    const {
      to,
      className,
      children,
      theme = AppLinkTheme.PRIMARY,
      ...otherProps
    } = props;

    return (
      <Link
        to={to}
        ref={ref}
        className={classNames(cls.AppLink, { [cls[theme]]: true }, [
          className
        ])}
        {...otherProps}
      >
        {children}
      </Link>
    );
  })
);
