import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Comment } from 'entities/Comment/model/types/CommentTypes';
import { Avatar } from 'shared/ui/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton';

interface CommentCardProps {
  className?: string;
  isLoading?: boolean;
  comment: Comment;
}

export const CommentCard = (props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" className={cls.avatar} />
          <Skeleton
            height={16}
            width={100}
            className={cls.username}
          />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment.user.avatar ? (
          <Avatar
            size={30}
            className={cls.avatar}
            src={comment.user.avatar}
          />
        ) : null}
        <Text title={comment.user.username} />
      </div>
      <Text className={cls.text} text={comment.text} />
    </div>
  );
};
