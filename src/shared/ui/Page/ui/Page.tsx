import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { MutableRefObject, ReactNode, useRef } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef
  });

  return (
    <section
      className={classNames(cls.Page, {}, [className])}
      ref={wrapperRef}
    >
      {children}
      <div ref={triggerRef} className={cls.triggerRef} />
    </section>
  );
};
