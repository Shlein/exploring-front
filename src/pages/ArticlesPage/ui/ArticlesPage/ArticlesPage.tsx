import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import { memo } from 'react';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      ArticlesPage
    </div>
  );
};

export default memo(ArticlesPage);
