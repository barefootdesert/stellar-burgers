import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectBurgerConstructorState
} from '../../services/burger-constructor/slice';
import {
  clearOrderModal,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/create-order/slice';
import { selectUserProfile } from '../../services/profile-user/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrderThunk } from '../../services/create-order/actions';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectBurgerConstructorState);

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUserProfile);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (orderRequest) return;
    if (!constructorItems.bun) return;
    if (!user) {
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }
    const orderItems = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ];

    dispatch(createOrderThunk(orderItems))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch(() => {});
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
