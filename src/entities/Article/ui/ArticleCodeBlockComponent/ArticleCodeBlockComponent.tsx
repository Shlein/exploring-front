import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleCodeBlock } from 'entities/Article/model/types/ArticleDetailsTypes';

import cls from './ArticleCodeBlockComponent.module.scss';
import { Code } from 'shared/ui/Code';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [
          className
        ])}
      >
        <Code text={block.code} />
      </div>
    );
  }
);
