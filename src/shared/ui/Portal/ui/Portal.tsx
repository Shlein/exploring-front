import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Portal.module.scss';
import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface PortalProps {
  element?: HTMLElement;
  children: ReactNode;
}

export const Portal = (props: PortalProps) => {
  const { element = document.body, children } = props;
  return createPortal(children, element);
};
