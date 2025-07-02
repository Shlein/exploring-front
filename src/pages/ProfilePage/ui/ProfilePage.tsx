import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';
import {
  ProfileCard,
  ProfileReducer,
  fetchProfileData
} from 'entities/Profile';
import { useAppDispatch } from 'app/providers/StoreProvider/config/hooks';
import { useEffect } from 'react';

import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
  profile: ProfileReducer
};

function ProfilePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  useDynamicModuleLoader(reducers);
  return (
    <div>
      <ProfileCard />
    </div>
  );
}

export default ProfilePage;
