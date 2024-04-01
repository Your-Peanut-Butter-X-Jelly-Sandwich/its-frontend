describe('student spec', () => {
  before(() => {
    cy.visit('http://localhost:3000/en/auth');
    cy.get('a[id=login-link]').click();
    cy.get('input[id=email]').type('stu01@student.com');
    cy.get('input[id=password]').type('CS3213ITS');
    cy.get('button[id=login-button]').click();
  });

  it('passes', () => {
    cy.contains('stu01@student.com');
    cy.visit('http://localhost:3000/en/student/questions');
    cy.get('button[id=1]').click();
    cy.get('div[class=view-line]').type('print("Hello World")');
    cy.get('button[id=submit-button]').click();
    cy.wait(10000);
    cy.get('button').contains('View').click();
  });
});
