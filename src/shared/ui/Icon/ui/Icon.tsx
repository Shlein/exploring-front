import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGGElement>>;
}

export const Icon = (props: IconProps) => {
  const { className, Svg } = props;
  return <Svg className={classNames(cls.Icon, {}, [className])} />;
};
