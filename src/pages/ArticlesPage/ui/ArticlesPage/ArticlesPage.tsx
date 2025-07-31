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
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import {
  getArticlesPageError,
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPagePageNumber,
  getArticlesPageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';

import cls from './ArticlesPage.module.scss';
import { Page } from 'shared/ui/Page';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlesPageReducer
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  useDynamicModuleLoader(reducers);
  const dispatch = useAppDispatch();
  const articles = useAppSelector(getArticles.selectAll);
  const isLoading = useAppSelector(getArticlesPageIsLoading);
  const error = useAppSelector(getArticlesPageError);
  const view = useAppSelector(getArticlesPageView);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(articlesPageActions.initState());
    dispatch(
      fetchArticlesList({
        page: 1
      })
    );
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
