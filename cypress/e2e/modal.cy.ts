import { selectors } from '../support/selectors';

describe('Работа модальных окон', () => {
  beforeEach(() => {
    cy.mockIngredient();
    cy.visitApp(false);
  });

  const firstElementOpenModal = () => {
    cy.get(selectors.ingredientLink).first().click();
  };

  it('открытие модального окна ингредиента', () => {
    firstElementOpenModal();
    cy.get(selectors.modalIngredient).should('exist').and('be.visible');
  });

  it('закрытие по клику на крестик', () => {
    firstElementOpenModal();

    cy.get(selectors.modalCloseButton).click();
    cy.get(selectors.modalIngredient).should('not.exist');
  });

  it('закрытие по клику на оверлей', () => {
    firstElementOpenModal();
    // Как я понимаю не самое правильное решение, так как может привести к ошибкам.
    // Но в рамках клика по оверлею, кажется допустимым
    cy.get(selectors.modalOverlay).click({ force: true });
    cy.get(selectors.modalIngredient).should('not.exist');
  });
});
