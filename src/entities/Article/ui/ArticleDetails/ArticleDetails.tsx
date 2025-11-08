import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { ArticleCodeBlockComponent } from '@/entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '@/entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '@/entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
import {
  ReducersList,
  useDynamicModuleLoader
} from '@/shared/lib/useDynamicModuleLoader';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '@/entities/Article/model/selectors/articleDetailsSelectors';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { fetchArticleById } from '@/entities/Article/services/fetchArticleById/fetchArticleById';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ArticleBlock } from '@/entities/Article/model/types/ArticleDetailsTypes';
import { ArticleBlockType } from '@/entities/Article/consts/consts';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: ArticleDetailsReducer
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  useDynamicModuleLoader(reducers, true);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    //   if (__PROJECT__ !== 'storybook') {
    dispatch(fetchArticleById(id));
    //   }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <VStack>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton
          className={cls.skeleton}
          width="100%"
          height={200}
        />
        <Skeleton
          className={cls.skeleton}
          width="100%"
          height={200}
        />
      </VStack>
    );
  } else if (error) {
    content = <Text align={TextAlign.center} />;
  } else {
    content = (
      <>
        <HStack justify="center" max className={cls.avatarWrapper}>
          <Avatar
            size={200}
            src={article?.img}
            className={cls.avatar}
          />
        </HStack>
        <VStack gap="4" max>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap="8" className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap="8" className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <VStack
      gap="16"
      className={classNames(cls.ArticleDetails, {}, [className])}
    >
      {content}
    </VStack>
  );
});
