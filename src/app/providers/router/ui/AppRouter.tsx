import { useAppSelector } from 'app/providers/StoreProvider/config/hooks';
import { getUserAuthData } from 'entities/User/selectors/userSelectors';
import { Suspense, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from 'shared/config/routerConfig/routerConfig';
import { PageLoader } from 'shared/ui/PageLoader';

export const AppRouter = memo(() => {
  const isAuth = useAppSelector(getUserAuthData);

  const routes = useMemo(() => {
    return Object.values(routerConfig).filter(route => {
      if (route.authOnly && !isAuth) {
        return false;
      }
      return true;
    });
  }, [isAuth]);

  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<PageLoader />}>
              <div className="page-wrapper">{element}</div>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
});
