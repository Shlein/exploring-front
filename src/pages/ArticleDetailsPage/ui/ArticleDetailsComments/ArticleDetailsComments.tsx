import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/AddComment';
import { CommentList } from 'entities/Comment/ui/CommentList/CommentList';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';
import { getArticleComments } from 'pages/ArticleDetailsPage/model/slice/ActicleDetailsCommentsSlice';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/comments';
import cls from './ArticleDetailsComments.module.scss';
import { VStack } from 'shared/ui/Stack';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = (
  props: ArticleDetailsCommentsProps
) => {
  const { className, id } = props;
  const dispatch = useDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.ArticleDetailsComments, {}, [
        className
      ])}
    >
      <Text className={cls.commentTitle} title="Комментарии" />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </VStack>
  );
};
