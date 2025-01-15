import { lazy } from 'react';

export const MainPageLazy = lazy(
  () =>
    new Promise(res => {
      // @ts-expect-error because i ll change this import
      setTimeout(() => res(import('./MainPage')), 1500);
    })
);
