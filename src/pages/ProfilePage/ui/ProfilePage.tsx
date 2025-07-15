import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';
import {
  profileActions,
  ProfileCard,
  ProfileReducer,
  fetchProfileData
} from 'entities/Profile';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import { useCallback, useEffect } from 'react';
import { ProfileHeader } from 'entities/Profile/ui/ProfileHeader/ProfileHeader';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading';
import { getProfileReadonly } from 'entities/Profile/model/selectors/getProfileReadonly';
import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm';
import { Currency } from 'entities/Currency';

import cls from './ProfilePage.module.scss';
import { Country } from 'entities/Country';

const reducers: ReducersList = {
  profile: ProfileReducer
};

function ProfilePage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  const formData = useAppSelector(getProfileForm);
  const error = useAppSelector(getProfileError);
  const isLoading = useAppSelector(getProfileIsLoading);
  const readonly = useAppSelector(getProfileReadonly);

  const onChangeFirstName = (value?: string) => {
    dispatch(profileActions.updateProfile({ firstName: value }));
  };

  const onChangeLastName = (value?: string) => {
    dispatch(profileActions.updateProfile({ lastName: value }));
  };

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }));
    },
    [dispatch]
  );

  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(
        profileActions.updateProfile({ age: Number(value || 0) })
      );
    },
    [dispatch]
  );

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(
        profileActions.updateProfile({ username: value || '' })
      );
    },
    [dispatch]
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }));
    },
    [dispatch]
  );

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch]
  );

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch]
  );

  useDynamicModuleLoader(reducers);
  return (
    <div>
      <ProfileHeader />
      <ProfileCard
        readonly={readonly}
        data={formData}
        isLoading={isLoading}
        error={error}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeUsername={onChangeUsername}
        onChangeAvatar={onChangeAvatar}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
      />
    </div>
  );
}

export default ProfilePage;
