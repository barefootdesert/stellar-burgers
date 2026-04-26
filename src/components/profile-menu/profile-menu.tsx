import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUserThunk } from '../../services/profile-user/actions';
import { useDispatch } from '../../services/store';
import { resetUserOrders } from '../../services/profile-orders/slice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        dispatch(resetUserOrders());
        navigate('/login', { replace: true });
      })
      .catch(() => {});
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
