const API_URL = Cypress.env('BURGER_API_URL');

if (!API_URL) {
  throw new Error('BURGER_API_URL is not set');
}

export const urls = {
  ingredients: `${API_URL}/ingredients`,
  user: `${API_URL}/auth/user`,
  orders: `${API_URL}/orders`,
  ordersAll: `${API_URL}/orders/all`
};
