import { describe, expect, test } from '@jest/globals';
import {
  addIngredient,
  burgerConstructorSlice,
  moveIngredientDown, moveIngredientUp,
  removeIngredient
} from '../slice';
import { bun, main1, main2 } from '../../mock_ingridient';



describe('Проверка редьюсер слайса burgerConstructor', () => {
  test('Обработка экшена добавления ингредиента', () => {
    const state = burgerConstructorSlice.reducer(
      undefined,
      addIngredient(bun)
    );

    expect(state.constructorItems.bun).toMatchObject({
      ...bun
    });

    expect(state.constructorItems.bun?.id).toBeDefined();
    expect(state.constructorItems.ingredients).toEqual([]);
  });

  test('Обработка экшена удаления ингредиента', () => {
    const start_state = {
      constructorItems: {
        bun: null,
        ingredients: [{ ...main1, id: 'delete' }, { ...main2, id: 'save' }]
      }
    };


    const new_state = burgerConstructorSlice.reducer(
      start_state,
      removeIngredient('delete')
    );

    expect(new_state.constructorItems.ingredients).toHaveLength(1);
    expect(new_state.constructorItems.ingredients[0]).toMatchObject({
      ...main2
    });
  });

  test('Обработка экшена изменения порядка ингредиентов в начинке (Up)', () => {

    const start_state = {
      constructorItems: {
        bun: null,
        ingredients: [{ ...main1, id: 'test1' }, { ...main2, id: 'test2' }]
      }
    };

    const new_state = burgerConstructorSlice.reducer(
      start_state,
      moveIngredientUp(1)
    );

    expect(new_state.constructorItems.ingredients[0]._id).toBe(main2._id);
    expect(new_state.constructorItems.ingredients[1]._id).toBe(main1._id);
  });

  test('Обработка экшена изменения порядка ингредиентов в начинке (Down)', () => {

    const start_state = {
      constructorItems: {
        bun: null,
        ingredients: [{ ...main1, id: 'test1' }, { ...main2, id: 'test2' }]
      }
    };

    const new_state = burgerConstructorSlice.reducer(
      start_state,
      moveIngredientDown(0)
    );

    expect(new_state.constructorItems.ingredients[0]._id).toBe(main2._id);
    expect(new_state.constructorItems.ingredients[1]._id).toBe(main1._id);
  });

});
