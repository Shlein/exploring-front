import { RoutePaths } from '@/shared/config/routerConfig/routerConfig';
import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User/selectors/userSelectors';
import { ISidebarItem } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  userData => {
    const sidebarItemsList: ISidebarItem[] = [
      {
        path: RoutePaths.main,
        text: 'Main'
        // icon: ''
      },
      {
        path: RoutePaths.about,
        text: 'About'
        // icon: ''
      }
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: RoutePaths.profile + userData?.id,
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
      );
    }
    return sidebarItemsList;
  }
);
