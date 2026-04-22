import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const getUserOrders = createAsyncThunk<
  TOrder[],
  void,
  {
    rejectValue: string;
  }
>('userOrders/getUserOrders', async (_, thunkApi) => {
  try {
    return await getOrdersApi();
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Ошибка загрузки информации о заказе';
    return thunkApi.rejectWithValue(message);
  }
});
