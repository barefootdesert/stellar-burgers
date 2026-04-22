import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getIngredientsApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchOrderInfoThunk = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orderInfo/fetchOrderInfo', async (number, thunkApi) => {
  try {
    const orderResponse = await getOrderByNumberApi(number);
    return orderResponse?.orders?.[0];
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Ошибка загрузки информации о заказе';
    return thunkApi.rejectWithValue(message);
  }
});
