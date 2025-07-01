import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';
import { ProfileReducer } from 'entities/Profile';

import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
  profile: ProfileReducer
};

function ProfilePage() {
  useDynamicModuleLoader(reducers);
  return <div>ksfjkfs</div>;
}

export default ProfilePage;
