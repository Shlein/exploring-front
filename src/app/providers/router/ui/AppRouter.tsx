import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AppRouterProps,
  routeConfig
} from '@/shared/config/routerConfig/routerConfig';
import { PageLoader } from '@/shared/ui/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback(
    (route: AppRouterProps, key: any) => {
      const element = (
        <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
      );

      return (
        <Route
          key={key}
          path={route.path}
          element={
            route.authOnly ? (
              <RequireAuth roles={route.roles}>{element}</RequireAuth>
            ) : (
              element
            )
          }
        />
      );
    },
    []
  );

  return (
    <Routes>
      {Object.values(routeConfig).map(route =>
        renderWithWrapper(route, route)
      )}
    </Routes>
  );
});
