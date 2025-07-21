import { RoutePaths } from 'shared/config/routerConfig/routerConfig';

export interface ISidebarItem {
  icon?: any;
  path: string;
  text: string;
  authOnly?: boolean;
}

export const SidebarItemsList: ISidebarItem[] = [
  {
    path: RoutePaths.main,
    text: 'Main'
    // icon: ''
  },
  {
    path: RoutePaths.about,
    text: 'About'
    // icon: ''
  },
  {
    path: RoutePaths.profile,
    text: 'Profile',
    // icon: '',
    authOnly: true
  },
  {
    path: RoutePaths.articles,
    text: 'Articles',
    authOnly: true
    // icon: ''
  }
];
