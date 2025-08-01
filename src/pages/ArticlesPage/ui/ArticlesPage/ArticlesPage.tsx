import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleList, ArticleViewToggler } from 'entities/Article';
import { ArticleView } from 'entities/Article/model/types/ArticleDetailsTypes';
import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles
} from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import {
  getArticlesPageError,
  getArticlesPageInited,
  getArticlesPageIsLoading,
  getArticlesPageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { Page } from 'widgets/Page';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';

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
  const articles = useAppSelector(getArticles.selectAll);
  const isLoading = useAppSelector(getArticlesPageIsLoading);
  const error = useAppSelector(getArticlesPageError);
  const view = useAppSelector(getArticlesPageView);
  const inited = useAppSelector(getArticlesPageInited);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initArticlesPage());
  }, [dispatch]);

  const toggleView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  return (
    <Page
      className={classNames(cls.ArticlesPage, {}, [className])}
      onScrollEnd={onLoadNextPart}
    >
      <ArticleViewToggler view={view} onViewClick={toggleView} />
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
      />
    </Page>
  );
};

export default memo(ArticlesPage);
