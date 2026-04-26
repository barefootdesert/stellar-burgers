import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { createOrderThunk } from './actions';

type CreateOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

export const initialState: CreateOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};
export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    clearOrderModal(state) {
      state.error = null;
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ?? 'Ошибка загрузки списка заказов';
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = {
          ...action.payload.order,
          ingredients: action.meta.arg
        };
        state.error = null;
      });
  }
});

export const { selectOrderRequest, selectOrderModalData, selectError } =
  createOrderSlice.selectors;

export const { clearOrderModal } = createOrderSlice.actions;
