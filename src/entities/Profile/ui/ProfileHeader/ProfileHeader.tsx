import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import { profileActions } from 'entities/Profile/model/slice/profileSlice';

import cls from './ProfileHeader.module.scss';
import { getProfileReadonly } from 'entities/Profile/model/selectors/getProfileReadonly';
import { useCallback } from 'react';
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData';
import { getUserAuthData } from 'entities/User/selectors/userSelectors';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData';

interface ProfileCardProps {
  className?: string;
}

export const ProfileHeader = (props: ProfileCardProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const readonly = useAppSelector(getProfileReadonly);
  const authData = useAppSelector(getUserAuthData);
  const profileData = useAppSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setProfileReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEditProfile());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title="Profile" className={cls.title} />
        {canEdit && (
          <div className={cls.btnsContainer}>
            {readonly ? (
              <Button
                theme={ThemeButton.OUTLINE}
                className={cls.editBtn}
                onClick={onEdit}
              >
                Edit
              </Button>
            ) : (
              <div className={cls.controls}>
                <Button
                  theme={ThemeButton.OUTLINE}
                  className={cls.editBtn}
                  onClick={onCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  theme={ThemeButton.OUTLINE}
                  className={cls.saveBtn}
                  onClick={onSave}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
