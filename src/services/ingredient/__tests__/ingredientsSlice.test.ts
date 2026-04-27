import { describe, test } from '@jest/globals';
import { fetchIngredientsThunk } from '../actions';
import { ingredientsSlice } from '../slice';
import { bun, main1, main2 } from '../../mock_ingridient';

describe('Редьюсеры слайса ingredientsSlice', () => {
  test('Проверка корректности экшена Request', () => {
    const state = ingredientsSlice.
    reducer(
      undefined,
      fetchIngredientsThunk.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.items).toEqual([]);
  })

  test('Проверка корректности экшена Success', () => {
    const mockData = [main1, main2];

    const state = ingredientsSlice.reducer(
      undefined,
      fetchIngredientsThunk.fulfilled(mockData, '', undefined)
    );

    expect(state.items).toEqual(mockData);
    expect(state.isLoading).toBe(false);
  })
});


  test('Проверка корректности экшена Failed', () => {
    const state = ingredientsSlice.reducer(
      undefined,
      fetchIngredientsThunk.rejected(
        new Error('Ошибка'),
        '',
        undefined
      )
    );
    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
});
