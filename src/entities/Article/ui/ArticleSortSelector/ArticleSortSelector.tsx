import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { Select } from '@/shared/ui/Select';
import { useCallback, useMemo } from 'react';
import { SelectOption } from '@/shared/ui/Select/ui/Select';
import { ArticleSortField } from '@/entities/Article/consts/consts';
import { SortOrder } from '@/shared/types';

interface ArticleSortSelectorProps {
  className?: string;
  order: SortOrder;
  sort: ArticleSortField;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = (
  props: ArticleSortSelectorProps
) => {
  const { className, onChangeOrder, onChangeSort, order, sort } =
    props;

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      { value: 'asc', name: 'возрастанию' },
      { value: 'desc', name: 'убыванию' }
    ],
    []
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      { value: ArticleSortField.CREATED, name: 'дате создания' },
      { value: ArticleSortField.TITLE, name: 'названию' },
      { value: ArticleSortField.VIEWS, name: 'популярности' }
    ],
    []
  );

  return (
    <div
      className={classNames(cls.ArticleSortSelector, {}, [className])}
    >
      <Select
        className={cls.sortSelect}
        label="Сортировать по: "
        options={sortFieldOptions}
        onChange={onChangeSort}
        value={sort}
      />
      <Select
        className={cls.orderSelect}
        label="по: "
        options={orderOptions}
        value={order}
        onChange={onChangeOrder}
      />
    </div>
  );
};
