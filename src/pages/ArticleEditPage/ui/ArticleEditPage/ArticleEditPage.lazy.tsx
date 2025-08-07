import { lazy } from 'react';

export const ArticleEditPageLazy = lazy(
  () =>
    new Promise(res => {
      // @ts-expect-error because i ll change this import
      setTimeout(() => res(import('./ArticleEditPage')), 400);
    })
);
