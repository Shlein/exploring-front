import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page
      className={classNames(cls.ArticleEditPage, {}, [className])}
    >
      {isEdit ? 'редактирование' : 'создание'}
    </Page>
  );
};

export default ArticleEditPage;
