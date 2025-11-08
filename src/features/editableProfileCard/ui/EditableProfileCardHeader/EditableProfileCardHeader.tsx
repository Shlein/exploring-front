import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getUserAuthData } from '@/entities/User/selectors/userSelectors';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';
import { Button, ThemeButton } from '@/shared/ui/Button';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <HStack
        max
        justify="between"
        className={classNames('', {}, [className])}
      >
        <Text title={t('Профиль')} />
        {canEdit && (
          <div>
            {readonly ? (
              <Button
                theme={ThemeButton.OUTLINE}
                onClick={onEdit}
                data-testid={'EditableProfileCardHeader.EditBtn'}
              >
                {t('Редактировать')}
              </Button>
            ) : (
              <HStack gap="8">
                <Button
                  theme={ThemeButton.OUTLINE}
                  onClick={onCancelEdit}
                  data-testid={'EditableProfileCardHeader.CancelBtn'}
                >
                  {t('Отменить')}
                </Button>
                <Button
                  theme={ThemeButton.OUTLINE}
                  onClick={onSave}
                  data-testid={'EditableProfileCardHeader.SaveBtn'}
                >
                  {t('Сохранить')}
                </Button>
              </HStack>
            )}
          </div>
        )}
      </HStack>
    );
  }
);
