import {
  ReducersList,
  useDynamicModuleLoader
} from '@/shared/lib/useDynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/Text/Text';
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
  profile: profileReducer
};

function ProfilePage() {
  useDynamicModuleLoader(reducers);
  const { id } = useParams<{ id: string }>();

  return (
    <Page>
      <VStack max gap="16">
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
}

export default ProfilePage;
