import { orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrderThunk = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { rejectValue: string }
>(
  'createOrder/createOrder',
  async (orderData: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(orderData);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ошибка загрузки информации о заказе';
      return rejectWithValue(message);
    }
  }
);
