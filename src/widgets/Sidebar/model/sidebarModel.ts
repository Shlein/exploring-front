import { RoutePaths } from 'shared/config/routerConfig/routerConfig';

export interface ISidebarItem {
  icon?: any;
  path: string;
  text: string;
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
    text: 'Profile'
    // icon: ''
  }
];
