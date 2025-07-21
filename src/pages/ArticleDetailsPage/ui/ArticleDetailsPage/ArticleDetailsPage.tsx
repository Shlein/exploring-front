import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { memo } from 'react';

interface ArticleDetailsProps {
  className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsProps) => {
  const { className } = props;
  return (
    <div
      className={classNames(cls.ArticleDetailsPage, {}, [className])}
    >
      ArticleDetailsPage
    </div>
  );
};

export default memo(ArticleDetailsPage);
