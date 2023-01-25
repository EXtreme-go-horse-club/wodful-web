context('[Authenticate] View', () => {
  describe('My login page screen', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('must be available', () => {
      cy.url().should('eq', 'http://localhost:3000/login');
    });

    it('should load correctly', () => {
      const element = cy.get('[data-cy="login-title"]');
      element.should('be.visible');
      element.should('contain', 'Acesso do Wodful');
    });

    it('should contain a logo', () => {
      const element = cy.get('[data-cy="logo-wodful"]');
      element.should('be.visible');
    });

    it('should contain two inputs', () => {
      const login = cy.get('[data-cy="input-email"]');
      const senha = cy.get('[data-cy="input-senha"]');
      login.should('be.visible');
      senha.should('be.visible');
    });

    it('should contain a button disabled', () => {
      const button = cy.get('[data-cy="button-continuar"]');
      button.should('be.visible').and('be.disabled');
    });

    it('should contain a link', () => {
      const button = cy.get('[data-cy="link-acesso"]');
      button.should('be.visible').and('contain', 'Acessar campeonato com código');
    });
  });
});

context('[Authenticate] Flow', () => {
  describe('WHEN a user access the login page', () => {
    describe('AND type a correct email and password', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.get('[data-cy="input-email"]').type('matheus@email.com');
        cy.get('[data-cy="input-senha"]').type('senha@123');
      });
      it('THEN the button must be enabled', () => {
        const button = cy.get('[data-cy="button-continuar"]');
        button.should('be.enabled');
      });
      describe('AND click in "Continuar"', () => {
        beforeEach(() => {
          cy.intercept('/api/auth/', { statusCode: 200, fixture: '/login/success/index.json' }).as(
            'success-login',
          );
          const button = cy.get('[data-cy="button-continuar"]');
          button.should('be.enabled');
          button.click();
        });
        it('should access the championships', () => {
          cy.wait('@success-login').then(() => {
            expect(cy.url().should('eq', 'http://localhost:3000/championships'));
          });
        });
        it('should RETURN 200 in access code', () => {
          cy.wait('@success-login').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
            expect(intercept.response.body.token).to.contain('batata').and.not.to.be.null;
            expect(intercept.response.body.user).not.to.be.null;
            expect(intercept.response.body.user.name).to.contain('Matheus').and.not.be.null;
            expect(intercept.response.body.user.email).to.contain('matheus@email.com').and.not.to.be
              .null;
          });
        });
      });
    });

    describe('AND type a incorrect email and password', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.get('[data-cy="input-email"]').type('xebas@email.com');
        cy.get('[data-cy="input-senha"]').type('sebas@123');
      });
      describe('AND click in "Continuar"', () => {
        beforeEach(() => {
          cy.intercept('/api/auth/', { statusCode: 400, fixture: '/login/error/index.json' }).as(
            'error-login',
          );
          const button = cy.get('[data-cy="button-continuar"]');
          button.should('be.enabled');
          button.click();
        });
        it('should NOT access the championships', () => {
          cy.wait('@error-login').then(() => {
            expect(cy.url().should('not.eq', 'http://localhost:3000/championships'));
          });
        });
        it('should RETURN 400 in access code', () => {
          cy.wait('@error-login').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(400);
            expect(intercept.response.body.message).to.contain('Email or password incorrect!');
          });
        });
        it('must display a error message', () => {
          cy.wait('@error-login').then(() => {
            const message = cy.get('[data-cy="error-message"]');
            message.should('be.visible').and('contain', 'E-mail ou senha incorreto.');
          });
        });
      });
    });
  });
});
