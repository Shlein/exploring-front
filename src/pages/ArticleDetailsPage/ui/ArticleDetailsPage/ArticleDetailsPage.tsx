import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';

interface ArticleDetailsProps {
  className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsProps) => {
  const { className } = props;
  const { id } = useParams();

  if (!id) {
    return <Text title="Статья не найдена" />;
  }

  return (
    <div
      className={classNames(cls.ArticleDetailsPage, {}, [className])}
    >
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
