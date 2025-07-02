import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button';
import {
  useAppDispatch,
  useAppSelector
} from 'app/providers/StoreProvider/config/hooks';
import { getProfileData } from '../model/selectors/getProfileData';
import { getProfileError } from '../model/selectors/getProfileError';
import { getProfileIsLoading } from '../model/selectors/getProfileIsLoading';
import { Input } from 'shared/ui/Input/Input';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const data = useAppSelector(getProfileData);
  const isLoading = useAppSelector(getProfileError);
  const error = useAppSelector(getProfileIsLoading);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title="Profile" className={cls.title} />
        <Button theme={ThemeButton.OUTLINE} className={cls.editBtn}>
          Edit
        </Button>
      </div>
      <div className={cls.data}>
        <Input value={data?.username} label="Username" />
        <Input value={data?.firstName} label="FirstName" />
        {/* <Input value={data?.age}  /> */}
      </div>
    </div>
  );
};
