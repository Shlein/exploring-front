import { classNames } from 'shared/lib/classNames/classNames';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { ReactNode } from 'react';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
  className?: string;
  children: ReactNode;
  initialState?: StateSchema;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { className, children, initialState } = props;
  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
