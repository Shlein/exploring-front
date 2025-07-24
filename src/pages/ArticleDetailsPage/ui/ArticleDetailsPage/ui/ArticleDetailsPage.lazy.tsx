import { lazy } from 'react';

export const ArticleDetailsPageLazy = lazy(
  () =>
    new Promise(res => {
      // @ts-expect-error because i ll change this import
      setTimeout(() => res(import('./ArticleDetailsPage')), 1500);
    })
);
