import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleViewToggler.module.scss';
import IconGrid from 'shared/assets/icons/grid.svg';
import IconList from 'shared/assets/icons/list.svg';
import { Button, ThemeButton } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon';
import { memo, useCallback } from 'react';
import { ArticleView } from 'entities/Article/consts/consts';

interface ArticleViewTogglerProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: IconGrid
  },
  {
    view: ArticleView.BIG,
    icon: IconList
  }
];

export const ArticleViewToggler = memo(
  (props: ArticleViewTogglerProps) => {
    const { className, onViewClick, view } = props;

    const onClickHandler = useCallback(
      (newView: ArticleView) => {
        onViewClick(newView);
      },
      [view]
    );

    return (
      <div
        className={classNames(cls.ArticleViewToggler, {}, [
          className
        ])}
      >
        {viewTypes.map((viewType, index) => (
          <Button
            onClick={() => onClickHandler(viewType.view)}
            key={index}
            className={cls.viewBtn}
            theme={ThemeButton.CLEAR}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames(cls.viewIcon, {
                [cls.notSelected]: view !== viewType.view
              })}
            />
          </Button>
        ))}
      </div>
    );
  }
);
