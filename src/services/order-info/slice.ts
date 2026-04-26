import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderInfoThunk } from './actions';
import { TOrder } from '@utils-types';

type TOrderInfoState = {
  data: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderInfoState = {
  data: null,
  isLoading: false,
  error: null
};

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    clearOrderInfo: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderInfoThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderInfoThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrderInfoThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          action.error.message ??
          'Ошибка загрузки информации о заказе';
      });
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectOrder: (state) => state.data
  }
});

export const { clearOrderInfo } = orderInfoSlice.actions;
export const { selectIsLoading, selectError, selectOrder } =
  orderInfoSlice.selectors;
export default orderInfoSlice.reducer;
