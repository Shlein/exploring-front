import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AppRouterProps,
  routerConfig
} from 'shared/config/routerConfig/routerConfig';
import { PageLoader } from 'shared/ui/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRouterProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        <div className="page-wrapper">{route.element}</div>
      </Suspense>
    );

    return (
      <Route
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routerConfig).map(renderWithWrapper)}
    </Routes>
  );
});
