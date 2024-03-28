describe('login spec', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000/en/auth');
        cy.get('a[id=login-link]').click();
        cy.get('input[id=email]').type('stu01@student.com');
        cy.get('input[id=password]').type('CS3213ITS');
        cy.get('button[id=login-button]').click();
    });
  });
  