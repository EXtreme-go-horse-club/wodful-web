Cypress.Commands.add('login', () => {
  cy.intercept('/api/auth/', { statusCode: 200, fixture: '/login/success/index.json' }).as(
    'success-login',
  );
  cy.visit('/login');
  cy.get('[data-cy="input-email"]').type('email@email.com');
  cy.get('[data-cy="input-senha"]').type('senha@123');
  cy.get('[data-cy="button-continuar"]').click();

  cy.wait('@success-login').then(() => {
    expect(cy.url().should('eq', 'http://localhost:3000/championships'));
  });
});

export {};
