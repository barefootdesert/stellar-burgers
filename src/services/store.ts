import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './burger-constructor/slice';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredient/slice';
import { orderInfoSlice } from './order-info/slice';
import { feedInfoSlice } from './feed-info/slice';
import { createOrderSlice } from './create-order/slice';
import { userProfileSlice } from './profile-user/slice';
import { userOrdersSlice } from './profile-orders/slice';

const rootReducer = combineSlices(
  burgerConstructorSlice,
  ingredientsSlice,
  orderInfoSlice,
  feedInfoSlice,
  createOrderSlice,
  userProfileSlice,
  userOrdersSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
