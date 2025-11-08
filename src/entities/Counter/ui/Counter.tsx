import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { counterSlice } from '../slice/CounterSlice';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

interface CounterProps {
  className?: string;
}

export const Counter = (props: CounterProps) => {
  const { className } = props;

  const dispatch = useDispatch();
  const counterValue = useSelector(
    (state: StateSchema) => state.counter.value
  );

  const decrement = () => {
    dispatch(counterSlice.actions.decrement());
  };

  const increment = () => {
    dispatch(counterSlice.actions.increment());
  };
  return (
    <div className={classNames(className)}>
      <h1 style={{ color: 'white' }}>value = {counterValue}</h1>
      <Button theme={ThemeButton.CLEAR} onClick={decrement}>
        -
      </Button>
      <Button theme={ThemeButton.CLEAR} onClick={increment}>
        +
      </Button>
    </div>
  );
};
