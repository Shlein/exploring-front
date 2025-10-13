import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'app/providers/StoreProvider/config/hooks';
import {
  getArticlesPageIsLoading,
  getArticlesPageError,
  getArticlesPageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { getArticles } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { ArticleList } from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = (
  props: ArticleInfiniteListProps
) => {
  const { className } = props;

  const articles = useAppSelector(getArticles.selectAll);
  const isLoading = useAppSelector(getArticlesPageIsLoading);
  const error = useAppSelector(getArticlesPageError);
  const view = useAppSelector(getArticlesPageView);

  if (error) {
    return <Text text={'Ошибка при загрузке статей'} />;
  }

  return (
    <div className={classNames('', {}, [className])}>
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
        className={className}
      />
    </div>
  );
};
