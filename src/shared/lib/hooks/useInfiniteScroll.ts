import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollProps {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = (props: UseInfiniteScrollProps) => {
  const { callback, triggerRef, wrapperRef } = props;

  useEffect(() => {
    const triggerElement = triggerRef.current;
    const wrapperElement = wrapperRef.current;
    let observer: IntersectionObserver | null;
    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '20px 20px 20px 45px',
        scrollMargin: '0px',
        threshold: 1.0
      };
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerElement);
    }
    return () => {
      if (observer && triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [triggerRef, wrapperRef]);
};
