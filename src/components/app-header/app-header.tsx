import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserProfile } from '../../services/profile-user/slice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUserProfile);
  return <AppHeaderUI userName={user?.name ?? ''} />;
};
