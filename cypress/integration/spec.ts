describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Welcome');
    cy.get('nav h1').should('have.text', ' NgMovies ');
    cy.get('.btn').should('contain.text', 'Navigate to movies section');
  });

  it('Correctly navigates to movie page', () => {
    cy.visit('/');
    cy.get('.btn').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/movies'));
  });

  it('Correctly loads movies', () => {
    cy.intercept('GET', 'http://localhost:3000/movies?q=', {
      fixture: 'movies.json',
    }).as('getMovies');
    cy.visit('/movies');
    cy.get('ngi-movie-item').should('have.length', 4);
  });
});
