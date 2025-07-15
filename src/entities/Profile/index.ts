export { Profile, ProfileSchema } from './model/types/profileTypes';
export {
  profileActions,
  ProfileReducer
} from './model/slice/profileSlice';

export { fetchProfileData } from './model/services/fetchProfileData';
export { updateProfileData } from './model/services/updateProfileData';

export { ProfileCard } from './ui/ProfileCard/ProfileCard';
