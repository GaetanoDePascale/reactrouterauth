describe('Login Tests', () => {
  beforeEach(() => {
    cy.wait(500);
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('Test error login', () => {
    cy.get('input[placeholder="Username"]').type('error');
    cy.get('input[placeholder="Password"]').type('error');
    // cy.get('.ant-btn').eq(0).click()
    cy.get('.ant-btn').contains('Login').click({ force: true });
    cy.contains('Login o password non corretta!').parent('div').parent('div').parent('div').should('have.class', 'ant-notification-notice-error');
  });

  it('Test user login successful', () => {
    cy.get('input[placeholder="Username"]').type('user');
    cy.get('input[placeholder="Password"]').type('user');
    // cy.get('.ant-btn').eq(0).click()
    cy.get('.ant-btn').contains('Login').click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/site/home');
    });
  });

  it('Test admin login successful', () => {
    cy.get('input[placeholder="Username"]').type('admin');
    cy.get('input[placeholder="Password"]').type('admin');
    // cy.get('.ant-btn').eq(0).click()
    cy.get('.ant-btn').contains('Login').click({ force: true });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/home');
    });
  });
});
