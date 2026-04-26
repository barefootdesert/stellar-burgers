import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectOrder,
  selectIsLoading,
  selectError,
  clearOrderInfo
} from '../../services/order-info/slice';
import { selectItems } from '../../services/ingredient/slice';
import { useParams } from 'react-router-dom';
import { fetchOrderInfoThunk } from '../../services/order-info/actions';

export const OrderInfo: FC = () => {
  const orderData = useSelector(selectOrder);
  const ingredients: TIngredient[] = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);

  useEffect(() => {
    if (!number || Number.isNaN(orderNumber)) return;

    dispatch(fetchOrderInfoThunk(orderNumber));

    return () => {
      dispatch(clearOrderInfo());
    };
  }, [dispatch, orderNumber, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
