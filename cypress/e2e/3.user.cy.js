describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('input[placeholder="Username"]').type('user');
    cy.get('input[placeholder="Password"]').type('user');
    // cy.get('.ant-btn').eq(0).click()
    cy.get('.ant-btn').contains('Login').click({ force: true });
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('Number Conversion', () => {
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/site/home');
    });

    cy.get('.ant-menu-item').contains('Number conversion').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/site/numberconversion');
    });

    cy.get('#txtValue').type('222.37888');
    cy.get('#txtPrecision').type('2');
    cy.get('.ant-btn').contains('Convert').click({ force: true });
    cy.get('#txtResult').should(($input) => {
      const val = $input.val();

      expect(val).to.eq('222.38');
    });

    cy.get('#txtValue').type('prova');
    cy.get('#txtPrecision').type('2');
    cy.get('.ant-btn').contains('Convert').click({ force: true });
    cy.get('#txtResult').should(($input) => {
      const val = $input.val();

      expect(val).to.eq('NaN');
    });
  });
});
