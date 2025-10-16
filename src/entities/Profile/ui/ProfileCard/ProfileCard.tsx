import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { useAppDispatch } from 'app/providers/StoreProvider/config/hooks';
import { Input } from 'shared/ui/Input/Input';
import { Profile } from '../../model/types/profileTypes';
import { Loader } from 'shared/ui/Loader/ui/Loader';

import cls from './ProfileCard.module.scss';
import { Avatar } from 'shared/ui/Avatar';
import { Select } from 'shared/ui/Select';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import { HStack, VStack } from 'shared/ui/Stack';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeLastName?: (value?: string) => void;
  onChangeFirstName?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeLastName,
    onChangeFirstName,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry
  } = props;

  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <HStack justify="center" max>
        <Loader />;
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack justify={'center'} max className={cls.ProfileCard}>
        <Text align={TextAlign.right} title="Error" text={error} />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  };

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify={'center'} max className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </HStack>
      )}
      <Input
        value={data?.firstName}
        label="FirstName"
        onChange={onChangeFirstName}
        readOnly={readonly}
        data-testid={'ProfileCard.firstName'}
      />
      <Input
        value={data?.lastName}
        label="LastName"
        onChange={onChangeLastName}
        readOnly={readonly}
        data-testid={'ProfileCard.lastName'}
      />
      <Input
        value={data?.age}
        label="Age"
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        label="City"
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        label="Username"
        className={cls.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        label="Avatar link"
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};
