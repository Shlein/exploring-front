import { lazy } from 'react';

export const ArticlesPageLazy = lazy(
  () =>
    new Promise(res => {
      // @ts-expect-error because i ll change this import
      setTimeout(() => res(import('./ArticlesPage')), 1500);
    })
);
