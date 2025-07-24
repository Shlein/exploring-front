import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CommentList.module.scss';
import { Comment } from 'entities/Comment/model/types/CommentTypes';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from 'shared/ui/Text/Text';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = (props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map(comment => (
          <CommentCard
            isLoading={isLoading}
            comment={comment}
            key={comment.id}
          />
        ))
      ) : (
        <Text title="Комментариев нет" />
      )}
    </div>
  );
};
