import { describe, test } from '@jest/globals';
import { getUserOrders } from '../actions';
import userOrdersSliceReducer from '../slice';
import { TOrder } from '@utils-types';

describe('Редьюсеры слайса ingredientsSlice', () => {
  test('Проверка корректности экшена Request', () => {
    const state = userOrdersSliceReducer(
      undefined,
      getUserOrders.pending('',undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  test('Проверка корректности экшена Success', () => {
    const mockData: TOrder = {
      _id: '1',
      createdAt: '1',
      ingredients: [],
      name: 'test',
      number: 0,
      status: 'test',
      updatedAt: 'test'
    };

    const state = userOrdersSliceReducer(
      undefined,
      getUserOrders.fulfilled([mockData], '', undefined)
    );

    expect(state.orders).toEqual([mockData]);
    expect(state.isLoading).toBe(false);
  });

  test('Проверка корректности экшена Failed', () => {
    const state = userOrdersSliceReducer(
      undefined,
      getUserOrders.rejected(new Error('Ошибка'), '', undefined)
    );
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });
});
