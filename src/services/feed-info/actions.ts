import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '@api';

export const fetchFeedInfoThunk = createAsyncThunk<
  TFeedsResponse,
  void,
  { rejectValue: string }
>('feedInfo/getFeedInfo', async (_, thunkApi) => {
  try {
    return await getFeedsApi();
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Ошибка загрузки информации о заказе';
    return thunkApi.rejectWithValue(message);
  }
});
