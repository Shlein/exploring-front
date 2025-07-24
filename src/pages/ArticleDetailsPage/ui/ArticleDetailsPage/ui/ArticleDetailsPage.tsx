import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import cls from './ArticleDetailsPage.module.scss';
import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';
import { CommentList } from 'entities/Comment/ui/CommentList/CommentList';
import {
  articleDetailsCommentsReducer,
  getArticleComments
} from 'pages/ArticleDetailsPage/model/slice/ActicleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/comments';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/AddComment';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  useDynamicModuleLoader(reducers, true);
  const { className } = props;
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, []);

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  if (!id) {
    return (
      <div
        className={classNames(cls.ArticleDetailsPage, {}, [
          className
        ])}
      >
        <Text title="Статья не найдена" theme={TextTheme.ERROR} />
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.ArticleDetailsPage, {}, [className])}
    >
      <ArticleDetails id={id} />
      <Text className={cls.commentTitle} title="Комментарии" />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </div>
  );
};

export default memo(ArticleDetailsPage);
