import { classNames } from '@/shared/lib/classNames/classNames';
import { RatingCard } from '@/entities/Rating';
import { useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { getUserAuthData } from '@/entities/User/selectors/userSelectors';
import {
  useGetArticleRating,
  useRateArticle
} from '../../api/articleRatingApi';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useCallback } from 'react';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = (props: ArticleRatingProps) => {
  const { className, articleId } = props;

  const userData = useAppSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? ''
  });

  const [rateArticleMutation, {}] = useRateArticle();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      rateArticleMutation({
        articleId,
        rate: starsCount,
        userId: userData?.id ?? '',
        feedback
      });
    },
    [articleId, userData?.id, rateArticleMutation]
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle]
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle]
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      className={className}
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      title="Оцените статью"
      feedbackTitle="Оставьте отзыв о статье"
      hasFeedback
    />
  );
};

export default ArticleRating;
