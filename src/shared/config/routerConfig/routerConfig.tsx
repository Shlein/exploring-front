import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

type AppRouterProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
  PROFILE = 'profile'
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: 'about',
  [AppRoutes.PROFILE]: 'profile',
  [AppRoutes.NOT_FOUND]: '*'
};

export const routerConfig: Record<AppRoutes, AppRouterProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePaths.main,
    element: <MainPage />
  },
  [AppRoutes.ABOUT]: {
    path: RoutePaths.about,
    element: <AboutPage />
  },
  [AppRoutes.PROFILE]: {
    path: RoutePaths.profile,
    element: <ProfilePage />,
    authOnly: true
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />
  }
};
