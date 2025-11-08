import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import {
  ReducersList,
  useDynamicModuleLoader
} from '@/shared/lib/useDynamicModuleLoader';
import { articlesPageReducer } from '@/pages/ArticlesPage/model/slice/articlesPageSlice';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '@/pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '@/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { useSearchParams } from 'react-router-dom';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlesPageReducer
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  useDynamicModuleLoader(reducers, false);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <Page
      className={classNames(cls.ArticlesPage, {}, [className])}
      onScrollEnd={onLoadNextPart}
    >
      <ArticlePageFilters />
      <ArticleInfiniteList />
    </Page>
  );
};

export default memo(ArticlesPage);
