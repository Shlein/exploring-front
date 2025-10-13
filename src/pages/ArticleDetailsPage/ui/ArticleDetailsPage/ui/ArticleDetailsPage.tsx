import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
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
import { Page } from 'widgets/Page';
import { getArticleRecommendations } from 'pages/ArticleDetailsPage/model/slice/ActicleDetailsRecommendationsSlice';
import { getArticleDetailsRecommendationsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/recommendations';
import { fetchArticleRecommendations } from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slice';

import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { VStack } from 'shared/ui/Stack';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { ArticleDetailsComments } from '../../ArticleDetailsComments/ArticleDetailsComments';

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
