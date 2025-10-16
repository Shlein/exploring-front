import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecommendationsList } from 'features/articleRecommendationsList/api/articleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;

    const {
      isLoading,
      data: articles,
      error
    } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
      return null;
    }

    return (
      <VStack
        gap="8"
        className={classNames(cls.ArticleRecommendationsList, {}, [
          className
        ])}
      >
        <Text size={TextSize.L} title="Рекомендации: " />
        <ArticleList
          isLoading={isLoading}
          articles={articles}
          target="_blank"
        />
      </VStack>
    );
  }
);
