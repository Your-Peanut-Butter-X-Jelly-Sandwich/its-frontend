describe('tutor spec', () => {
    before(() => {
      cy.visit('http://localhost:3000/en/auth');
      cy.get('a[id=login-link]').click();
      cy.get('input[id=email]').type('tut11@tutor.com');
      cy.get('input[id=password]').type('CS3213ITS');
      cy.get('button[id=login-button]').click();
    });
  
    it('tutor can log in and view dashboard', () => {
      cy.contains('Dashboard');
      cy.contains('Add Question');
      cy.contains('Check Questions');
      // cy.visit('http://localhost:3000/en/tutor/add-question');
    });

    it('tutor can add a question', () => {
        // cy.get('.ant-menu-item').contains('Add Question').click();

    });
  });


      //   cy.get('button[id=1]').click();
    //   cy.get('div[class=view-line]').type('print("Hello World")');
    //   cy.get('button[id=submit-button]').click();
    //   cy.get('button').contains('View').click();
  