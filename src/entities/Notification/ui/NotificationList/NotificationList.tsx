import { classNames } from '@/shared/lib/classNames/classNames';
import { useNotifications } from '@/entities/Notification/api/notificationApi';
import { VStack } from '@/shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
  const { className } = props;
  const { data, isLoading, isError } = useNotifications(null, {
    pollingInterval: 10000
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map(el => <NotificationItem item={el} key={el.id} />)}
    </VStack>
  );
};
