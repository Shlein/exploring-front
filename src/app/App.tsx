import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { PageLoader } from 'shared/ui/PageLoader';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';
import { initAuthData } from 'entities/User/slice/userSlice';
import {
  useAppDispatch,
  useAppSelector
} from './providers/StoreProvider/config/hooks';
import { getUserInited } from 'entities/User/selectors/getUserInited';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const initedUser = useAppSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {initedUser && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
