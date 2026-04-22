import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectItems,
  selectIsLoading,
  selectError
} from '../../services/ingredient/slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const { id } = useParams<{ id: string }>();
  const ingredientData = useMemo(
    () => ingredients.find((item) => item._id === id) ?? null,
    [id, ingredients]
  );

  if (!ingredientData || isLoading) {
    return <Preloader />;
  }
  if (error) return <div>Ошибка:{error}</div>;
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
