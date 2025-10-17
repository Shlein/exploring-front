import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AdminPanelPage.module.scss';
import { Page } from 'widgets/Page';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
  const { className } = props;
  return (
    <Page className={classNames(cls.AdminPanelPage, {}, [className])}>
      admin panel
    </Page>
  );
};

export default AdminPanelPage;
