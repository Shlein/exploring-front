import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';
import { CommentList } from 'entities/Comment/ui/CommentList/CommentList';
import { getArticleComments } from 'pages/ArticleDetailsPage/model/slice/ActicleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/comments';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/AddComment';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { Button } from 'shared/ui/Button';
import { RoutePaths } from 'shared/config/routerConfig/routerConfig';
import { Page } from 'widgets/Page';
import { getArticleRecommendations } from 'pages/ArticleDetailsPage/model/slice/ActicleDetailsRecommendationsSlice';
import { getArticleDetailsRecommendationsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/recommendations';
import { fetchArticleRecommendations } from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slice';

import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  useDynamicModuleLoader(reducers, true);
  const { className } = props;
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(
    getArticleRecommendations.selectAll
  );
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendationsIsLoading = useSelector(
    getArticleDetailsRecommendationsIsLoading
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  }, []);

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  const onBackToList = useCallback(() => {
    navigate(RoutePaths.articles);
  }, [navigate]);

  if (!id) {
    return (
      <Page
        className={classNames(cls.ArticleDetailsPage, {}, [
          className
        ])}
      >
        <Text title="Статья не найдена" theme={TextTheme.ERROR} />
      </Page>
    );
  }

  return (
    <Page
      className={classNames(cls.ArticleDetailsPage, {}, [className])}
    >
      <Button onClick={onBackToList}>Назад к списку</Button>
      <ArticleDetails id={id} />
      <Text
        className={cls.recommendationsTitle}
        title="Рекомендации: "
      />
      <ArticleList
        isLoading={recommendationsIsLoading}
        articles={recommendations}
        className={cls.recommendations}
        target="_blank"
      />
      <Text className={cls.commentTitle} title="Комментарии" />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </Page>
  );
};

export default memo(ArticleDetailsPage);
