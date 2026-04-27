import { rootReducer } from '../store';

import burgerConstructorReducer from '../burger-constructor/slice';
import ingredientsReducer from '../ingredient/slice';
import orderInfoReducer from '../order-info/slice';
import feedInfoReducer from '../feed-info/slice';
import createOrderReducer from '../create-order/slice';
import userProfileReducer from '../profile-user/slice';
import userOrdersReducer from '../profile-orders/slice';

describe('Инициализация rootReducer', () => {
  test('Вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером, возвращает корректное начальное состояние хранилища.', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const state = rootReducer(undefined, action);

    expect(state).toEqual({
      burgerConstructor: burgerConstructorReducer(undefined, action),
      ingredients: ingredientsReducer(undefined, action),
      orderInfo: orderInfoReducer(undefined, action),
      feedInfo: feedInfoReducer(undefined, action),
      createOrder: createOrderReducer(undefined, action),
      profileUser: userProfileReducer(undefined, action),
      userOrders: userOrdersReducer(undefined, action)
    });
  });
});
