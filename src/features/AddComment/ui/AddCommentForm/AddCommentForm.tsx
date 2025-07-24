import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import {
  getAddCommentError,
  getAddCommentText
} from 'features/AddComment/model/selectors/addCommentSelectors';
import { memo, useCallback } from 'react';
import {
  addCommentActions,
  addCommentReducer
} from 'features/AddComment/model/slice/addCommentSlice';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';

import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addComment: addCommentReducer
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  useDynamicModuleLoader(reducers);
  const dispatch = useAppDispatch();

  const text = useAppSelector(getAddCommentText);
  const error = useAppSelector(getAddCommentError);

  const handleSetCommentText = useCallback(
    (value: string) => {
      dispatch(addCommentActions.setCommentText(value));
    },
    [dispatch]
  );

  const onSendCommentHandler = useCallback(() => {
    onSendComment(text || '');
    handleSetCommentText('');
  }, [handleSetCommentText, text, onSendComment]);

  return (
    <div className={classNames(cls.AddCommentForm, {}, [className])}>
      <div className={cls.control}>
        {error && (
          <Text
            className={cls.error}
            theme={TextTheme.ERROR}
            text={error}
          />
        )}
        <Input
          label="Введите коммент"
          className={cls.input}
          placeholder="Комментарий"
          value={text}
          onChange={handleSetCommentText}
        />
      </div>
      <Button onClick={onSendCommentHandler} className={cls.submit}>
        Отправить
      </Button>
    </div>
  );
});

export default AddCommentForm;
