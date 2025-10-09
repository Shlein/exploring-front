import { Menu } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';

import cls from './Dropdown.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { Button } from 'shared/ui/Button';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from 'shared/ui/AppLink/AppLink';

export interface IDropdownItem {
  onClick?: () => void;
  content?: ReactNode;
  disabled?: boolean;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: IDropdownItem[];
  trigger?: ReactNode;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft
};

export const Dropdown: React.FC<DropdownProps> = props => {
  const {
    className,
    trigger,
    items,
    direction = 'bottom left'
  } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames(cls.Dropdown, {}, [className])}
    >
      <Menu.Button className={cls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map(item => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type={'button'}
              onClick={item.onClick}
              disabled={item.disabled}
              className={classNames(cls.item, {
                [cls.active]: active
              })}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
                key={String(item.content)}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item
              as={Fragment}
              disabled={item.disabled}
              key={String(item.content)}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
