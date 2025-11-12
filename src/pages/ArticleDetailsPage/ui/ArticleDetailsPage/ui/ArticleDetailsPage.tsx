import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import {
  ReducersList,
  useDynamicModuleLoader
} from '@/shared/lib/useDynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slice';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsPageHeader } from '../../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../../ArticleDetailsComments/ArticleDetailsComments';
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
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <Page
      className={classNames(cls.ArticleDetailsPage, {}, [className])}
    >
      <VStack gap="16" max justify={'center'}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <ArticleRating articleId={id} />
        <ArticleRecommendationsList />
        <ArticleDetailsComments id={id} />
      </VStack>
    </Page>
  );
};

export default memo(ArticleDetailsPage);
