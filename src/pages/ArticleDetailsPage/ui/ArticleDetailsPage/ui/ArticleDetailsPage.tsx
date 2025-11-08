import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import {
  ReducersList,
  useDynamicModuleLoader
} from '@/shared/lib/useDynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slice';
import { ArticleDetailsPageHeader } from '../../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
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
  
  return (
    <Page
      className={classNames(cls.ArticleDetailsPage, {}, [className])}
    >
      <VStack gap="16" max justify={'center'}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <ArticleRecommendationsList />
        <ArticleDetailsComments id={id} />
      </VStack>
    </Page>
  );
};

export default memo(ArticleDetailsPage);
