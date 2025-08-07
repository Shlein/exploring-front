import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routerConfig/routerConfig';

import cls from './ArticleDetailsPageHeader.module.scss';
import { useAppSelector } from 'app/providers/StoreProvider/config/hooks';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetailsSelectors';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = (
  props: ArticleDetailsPageHeaderProps
) => {
  const { className } = props;
  const canEdit = useAppSelector(getCanEditArticle);
  const article = useAppSelector(getArticleDetailsData);

  const navigate = useNavigate();

  const onBackToList = useCallback(() => {
    navigate(RoutePaths.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(
      `${RoutePaths.article_details + article?.id}/edit`
    );
  }, [article?.id, navigate]);

  return (
    <div
      className={classNames(cls.ArticleDetailsPageHeader, {}, [
        className
      ])}
    >
      <Button onClick={onBackToList}>Назад к списку</Button>
      {canEdit && (
        <Button className={cls.editBtn} onClick={onEditArticle}>
          Редактировать
        </Button>
      )}
    </div>
  );
};
