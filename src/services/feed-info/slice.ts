import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchFeedInfoThunk } from './actions';

export type FeedInfoData = {
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: FeedInfoData = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const feedInfoSlice = createSlice({
  name: 'feedInfo',
  initialState,
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeed: (state) => state.feed,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedInfoThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedInfoThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки списка заказов';
      })
      .addCase(fetchFeedInfoThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      });
  }
});

export const { selectOrders, selectFeed, selectIsLoading, selectError } =
  feedInfoSlice.selectors;

export default feedInfoSlice.reducer
