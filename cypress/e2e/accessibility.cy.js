//TODO: (ET) Add more accessibility tests
describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe(); // Inject Axe for accessibility testing
  });

  it('should have no detectable a11y violations on load', () => {
    cy.checkA11y(); // Runs Axe audit on the full page
  });
});
