describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Username"]').type('admin');
    cy.get('input[placeholder="Password"]').type('admin');
    // cy.get('.ant-btn').eq(0).click()
    cy.get('.ant-btn').contains('Login').click({ force: true });
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('navigate to menu3', () => {
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/home');
    });

    cy.get('.ant-menu-item').contains('Menu 3').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/menu3');
    });
  });
});
