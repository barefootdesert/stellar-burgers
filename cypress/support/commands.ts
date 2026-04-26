import { urls } from './helpers';
import { selectors } from './selectors';
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      mockIngredient(): Chainable;
      mockUsers(): Chainable;
      mockOrdersAll(): Chainable;
      mockCreateOrder(): Chainable;
      visitApp(isAuth: boolean): Chainable;
      addBurgerElements(onlyFirst: boolean): Chainable;
      checkEmptyConstructor(): Chainable;
    }
  }
}

Cypress.Commands.add('mockIngredient', () => {
  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'GET',
        url: urls.ingredients
      },
      ingredients
    ).as('getIngredients');
  });
});

Cypress.Commands.add('mockUsers', () => {
  cy.fixture('auth-user.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'GET',
        url: urls.user
      },
      ingredients
    ).as('getUser');
  });
});
Cypress.Commands.add('mockOrdersAll', () => {
  cy.fixture('orders-all.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'GET',
        url: urls.ordersAll
      },
      ingredients
    ).as('getOrders');
  });
});
Cypress.Commands.add('mockCreateOrder', () => {
  cy.fixture('orders.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'POST',
        url: urls.orders
      },
      ingredients
    ).as('sendOrder');
  });
});
Cypress.Commands.add('visitApp', (isAuth) => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();

  cy.visit(
    'http://localhost:4000',
    isAuth
      ? {
          onBeforeLoad(win) {
            win.localStorage.setItem('refreshToken', 'test');
          }
        }
      : {}
  );
  if (isAuth) {
    cy.setCookie('accessToken', 'test');
  }
});

Cypress.Commands.add('addBurgerElements', (onlyFirst) => {
  const bun = cy.get(selectors.bunAddButton).first();
  const ingredient = onlyFirst
    ? cy.get(selectors.ingredientAddButton).first()
    : cy.get(selectors.ingredientAddButton);
  bun.click();
  ingredient.click({ multiple: true });
});

Cypress.Commands.add('checkEmptyConstructor', () => {
  cy.get(selectors.emptyConstructorBuns).should('have.length', 2);
  cy.get(selectors.emptyConstructorIngredients).should('have.length', 1);
});
