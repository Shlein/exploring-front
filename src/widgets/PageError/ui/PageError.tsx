import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageError.module.scss';
import { Button } from 'shared/ui/Button';

interface PageErrorProps {
  className?: string;
}

export const PageError = (props: PageErrorProps) => {
  const { className } = props;
  const reloadPage = () => window.location.reload();
  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>Непредвиденная ошибка</p>
      <Button onClick={reloadPage}>Перезагрузить страницу</Button>
    </div>
  );  
};
