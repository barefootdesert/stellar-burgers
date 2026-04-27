import { selectors } from '../support/selectors';

describe('Проверка корректности работы конструктора', () => {
  beforeEach(() => {
    cy.mockIngredient();
    cy.visitApp(false);
    cy.wait('@getIngredients');
  });
  it('Добавление булки и одного ингредиента', () => {
    cy.checkEmptyConstructor();

    cy.addBurgerElements(true);

    cy.get(selectors.emptyConstructorBuns).should('have.length', 0);
    cy.get(selectors.emptyConstructorIngredients).should('have.length', 0);

    const constructorBuns = cy.get(selectors.constructorBuns);
    constructorBuns.should('have.length', 2);

    constructorBuns.each(($item) => {
      cy.wrap($item).contains('Краторная булка N-200i');
    });

    const constructorIngredients = cy.get(selectors.constructorIngredients);

    constructorIngredients.should('have.length', 1);
    constructorIngredients.each((item) => {
      cy.wrap(item).contains('Биокотлета из марсианской Магнолии');
    });
  });

  it('Добавление булки и всех ингредиента', () => {
    cy.addBurgerElements(false);
    cy.get(selectors.ingredientAddButton)
      .its('length')
      .then((count) => {
        cy.get(selectors.constructorIngredients).should('have.length', count);
      });
  });
});
