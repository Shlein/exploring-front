import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ForbiddenPage.module.scss';
import { Page } from 'widgets/Page';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage = (props: ForbiddenPageProps) => {
  const { className } = props;
  return (
    <Page className={classNames(cls.ForbiddenPage, {}, [className])}>
      Нет доступа к этой странице
    </Page>
  );
};

export default ForbiddenPage;
