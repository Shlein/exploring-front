// import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { useEffect, useState } from 'react';
// import cls from './BugButton.module.scss';

interface BugButtonProps {
  className?: string;
}

// для теста errorboundary
export const BugButton = (props: BugButtonProps) => {
  // const { className } = props;

  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      throw new Error('тестовая кнопка симулировала ошибку');
    }
  }, [error]);

  const onThrow = () => setError(true);

  return (
    <Button
      onClick={onThrow}
    >
      симулировать ошибку
    </Button>
  );
};
