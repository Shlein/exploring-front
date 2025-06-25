import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { PageLoader } from 'shared/ui/PageLoader';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';
import { initAuthData } from 'entities/User/slice/userSlice';
import { useAppDispatch } from './providers/StoreProvider/config/hooks';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
