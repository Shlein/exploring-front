import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
  ReducersList,
  useDynamicModuleLoader
} from 'shared/lib/useDynamicModuleLoader';
import {
  profileActions,
  profileReducer
} from 'features/editableProfileCard/model/slice/profileSlice';
import { getProfileForm } from 'features/editableProfileCard/model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from 'features/editableProfileCard/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'features/editableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from 'features/editableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from 'features/editableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from 'features/editableProfileCard/model/services/fetchProfileData/fetchProfileData';
import { ValidateProfileError } from 'features/editableProfileCard';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { VStack } from 'shared/ui/Stack';

const reducers: ReducersList = {
  profile: profileReducer
};

interface EditableProfileCardProps {
  className?: string;
  id: string;
}

export const EditableProfileCard = memo(
  (props: EditableProfileCardProps) => {
    const { className, id } = props;
    useDynamicModuleLoader(reducers);

    const dispatch = useAppDispatch();

    useEffect(() => {
      if (id) {
        dispatch(fetchProfileData(id));
      }
    }, []);

    const formData = useAppSelector(getProfileForm);
    const error = useAppSelector(getProfileError);
    const isLoading = useAppSelector(getProfileIsLoading);
    const readonly = useAppSelector(getProfileReadonly);
    const validateErrors = useAppSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
      [ValidateProfileError.SERVER_ERROR]:
        'Серверная ошибка при сохранении',
      [ValidateProfileError.INCORRECT_COUNTRY]: 'Некорректный регион',
      [ValidateProfileError.NO_DATA]: 'Данные не указаны',
      [ValidateProfileError.INCORRECT_USER_DATA]:
        'Имя и фамилия обязательны',
      [ValidateProfileError.INCORRECT_AGE]: 'Некорректный возраст'
    };

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
        dispatch(
          profileActions.updateProfile({ avatar: value || '' })
        );
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

    return (
      <VStack gap="8" max className={classNames('', {}, [className])}>
        <EditableProfileCardHeader />
        {validateErrors?.length &&
          validateErrors.map(err => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
            />
          ))}
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
      </VStack>
    );
  }
);
