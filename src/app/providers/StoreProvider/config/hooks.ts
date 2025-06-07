import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, AppStore, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(
  selector: (state: RootState) => T
) => useSelector<RootState, T>(selector);
export const useAppStore = () => useStore<AppStore>();
