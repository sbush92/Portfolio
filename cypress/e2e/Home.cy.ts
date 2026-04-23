describe('template spec', () => {
  it('passes', () => {
    cy.visit("http://localhost:5173");
    cy.get('[data-testid="home-heading"]').should('contain', 'Samuel Bush');
  })
})