import { describe, test } from '@jest/globals';
import { fetchFeedInfoThunk } from '../actions';
import feedInfoSliceReducer from '../slice';
import { TOrder } from '@utils-types';

describe('Редьюсеры слайса ingredientsSlice', () => {
  test('Проверка корректности экшена Request', () => {
    const state = feedInfoSliceReducer(
      undefined,
      fetchFeedInfoThunk.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
    expect(state.feed).toEqual({
      total: 0,
      totalToday: 0
    });
  })

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

    const state = feedInfoSliceReducer(
      undefined,
      fetchFeedInfoThunk.fulfilled({success: true, orders: [mockData], totalToday: 1, total: 200}, '', undefined)
    );

    expect(state.orders).toEqual([mockData]);
    expect(state.feed.totalToday).toEqual(1);
    expect(state.feed.total).toBe(200);
  })
  test('Проверка корректности экшена Failed', () => {
    const state = feedInfoSliceReducer(
      undefined,
      fetchFeedInfoThunk.rejected(
        new Error('Ошибка'),
        '',
        undefined
      )
    );
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });
});


