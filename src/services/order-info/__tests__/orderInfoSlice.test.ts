import { describe, test } from '@jest/globals';
import { fetchOrderInfoThunk } from '../actions';
import orderInfoReducer from '../slice';
import { TOrder } from '@utils-types';

describe('Редьюсеры слайса ingredientsSlice', () => {
  test('Проверка корректности экшена Request', () => {
    const state = orderInfoReducer(
      undefined,
      fetchOrderInfoThunk.pending('', 1, undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.data).toEqual(null);
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

    const state = orderInfoReducer(
      undefined,
      fetchOrderInfoThunk.fulfilled(mockData, '', 1, undefined)
    );

    expect(state.data).toEqual(mockData);
    expect(state.isLoading).toBe(false);
  });

  test('Проверка корректности экшена Failed', () => {
    const state = orderInfoReducer(
      undefined,
      fetchOrderInfoThunk.rejected(new Error('Ошибка'), '', 1, undefined)
    );
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });
});
