import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';
import { CSSProperties } from 'react';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  border?: string | number;
  width?: string | number;
}

export const Skeleton = (props: SkeletonProps) => {
  const { className, height, width, border } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border
  };

  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={styles}
    ></div>
  );
};
