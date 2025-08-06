import { classNames } from 'shared/lib/classNames/classNames';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import { useCallback } from 'react';
import {
  ArticleSortSelector,
  ArticleTypeTabs,
  ArticleView,
  ArticleViewToggler
} from 'entities/Article';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { Card } from 'shared/ui/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types';
import {
  ArticleSortField,
  ArticleType
} from 'entities/Article/model/types/ArticleDetailsTypes';

import cls from './ArticlePageFilters.module.scss';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';

interface ArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters = (
  props: ArticlePageFiltersProps
) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const view = useAppSelector(getArticlesPageView);
  const sort = useAppSelector(getArticlesPageSort);
  const order = useAppSelector(getArticlesPageOrder);
  const search = useAppSelector(getArticlesPageSearch);
  const type = useAppSelector(getArticlesPageType);

  const toggleView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const deboucedFetchData = useDebounce(fetchData, 500);

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
      dispatch(articlesPageActions.setPageNumber(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPageNumber(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const onChangeSearch = useCallback(
    (searchString: string) => {
      dispatch(articlesPageActions.setSearch(searchString));
      dispatch(articlesPageActions.setPageNumber(1));
      deboucedFetchData();
    },
    [dispatch, deboucedFetchData]
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPageNumber(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  return (
    <div
      className={classNames(cls.ArticlePageFilters, {}, [className])}
    >
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewToggler view={view} onViewClick={toggleView} />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onChangeSearch}
          value={search}
          label="Поиск"
          placeholder="Ищите"
        />
      </Card>
      <ArticleTypeTabs
        onChangeType={onChangeType}
        value={type}
        className={cls.tabs}
      />
    </div>
  );
};
