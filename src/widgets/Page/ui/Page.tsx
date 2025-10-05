import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import {
  MutableRefObject,
  ReactNode,
  UIEvent,
  useEffect,
  useRef
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import { getUIScrollByPath, uiActions } from 'features/UI';
import { useLocation } from 'react-router-dom';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useAppSelector((state: StateSchema) =>
    getUIScrollByPath(state, pathname)
  );

  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, [scrollPosition]);

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef
  });

  const onScrollHandler = useThrottle(
    (event: UIEvent<HTMLDivElement>) => {
      dispatch(
        uiActions.setScrollPosition({
          path: pathname,
          position: event.currentTarget.scrollTop
        })
      );
    },
    500
  );

  return (
    <main
      className={classNames(cls.Page, {}, [className])}
      ref={wrapperRef}
      onScroll={onScrollHandler}
    >
      {children}
      {onScrollEnd && (
        <div ref={triggerRef} className={cls.triggerRef} />
      )}
    </main>
  );
};
