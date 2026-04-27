import { selectors } from '../support/selectors';

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.mockIngredient();
    cy.mockUsers();
    cy.mockOrdersAll();
    cy.mockCreateOrder();
    cy.visitApp(true);
    cy.wait('@getIngredients');
  });

  it('Пользователь может оформить заказ', () => {
    cy.addBurgerElements(false);
    cy.get(selectors.sendOrderButton).click();
    cy.get(selectors.modalOrder).should('have.text', '666');
    cy.get(selectors.modalCloseButton).click();
    cy.get(selectors.modalOrder).should('not.exist');
    cy.checkEmptyConstructor();
  });
});
