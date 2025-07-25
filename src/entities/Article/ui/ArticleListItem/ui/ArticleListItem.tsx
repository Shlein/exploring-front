import { classNames } from 'shared/lib/classNames/classNames';
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView
} from 'entities/Article/model/types/ArticleDetailsTypes';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card';
import { useHover } from 'shared/lib/hooks/useHover';
import { Avatar } from 'shared/ui/Avatar';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Button, ThemeButton } from 'shared/ui/Button';

import cls from './ArticleListItem.module.scss';
import { useCallback } from 'react';
import { RoutePaths } from 'shared/config/routerConfig/routerConfig';
import { useNavigate } from 'react-router-dom';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = (props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const [isHover, bindHover] = useHover();

  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePaths.article_details + article.id);
  }, [article.id, navigate]);

  const types = (
    <Text text={article.type.join(', ')} className={cls.types} />
  );
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      block => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [
          className,
          cls[view]
        ])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text
              text={article.user.username}
              className={cls.username}
            />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <Button
              onClick={onOpenArticle}
              theme={ThemeButton.OUTLINE}
            >
              Читать далее...
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.ArticleListItem, {}, [
        className,
        cls[view]
      ])}
      onClick={onOpenArticle}
      {...bindHover}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <img
            src={article.img}
            alt={article.title}
            className={cls.img}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </div>
  );
};
