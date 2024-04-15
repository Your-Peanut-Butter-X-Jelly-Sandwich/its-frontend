describe('tutor login', () => {
  before(() => {
    cy.tutorLogin('tut11@tutor.com', 'CS3213ITS');
  });

  it('tutor can log in and view dashboard', () => {
    cy.contains('Dashboard');
    cy.contains('Add Question');
    cy.contains('Check Questions');
    // cy.visit('http://localhost:3000/en/tutor/add-question');
  });
});
