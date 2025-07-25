import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import {
  Article,
  ArticleView
} from 'entities/Article/model/types/ArticleDetailsTypes';
import { ArticleListItem } from '../../ArticleListItem';
import { memo } from 'react';
import { ArticleListItemSkeleton } from '../../ArticleListItem/ui/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton
        view={view}
        key={index}
        className={cls.card}
      />
    ));
};

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL
  } = props;

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ArticleList, {}, [
          className,
          cls[view]
        ])}
      >
        {getSkeletons(view)}
      </div>
    );
  }

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      key={article.id}
      className={cls.card}
    />
  );

  return (
    <div
      className={classNames(cls.ArticleList, {}, [
        className,
        cls[view]
      ])}
    >
      {articles.length ? articles.map(renderArticle) : null}
    </div>
  );
});
