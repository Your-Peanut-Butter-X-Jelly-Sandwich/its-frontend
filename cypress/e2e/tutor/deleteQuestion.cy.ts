describe('tutor check questions', () => {
    before(() => {
      cy.tutorLogin('tut11@tutor.com', 'CS3213ITS');
    });

    it('tutor can check questions', () => {
      cy.contains('Check Questions').click();
      cy.contains('Here you can see ALL questions.');
      cy.contains('button', 'Delete').click();

    });
});