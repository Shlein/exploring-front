import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/ArticleDetailsTypes';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [
          className
        ])}
      >
        <img src={block.src} alt={block.title} className={cls.img} />
        {block.title && (
          <Text text={block.title} align={TextAlign.center} />
        )}
      </div>
    );
  }
);
