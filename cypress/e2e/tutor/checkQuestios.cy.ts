describe('tutor check questions', () => {
    before(() => {
      cy.tutorLogin('tut11@tutor.com', 'CS3213ITS');
    });

    it('tutor can check questions', () => {
      cy.contains('Check Questions').click();
      cy.contains('Here you can see ALL questions.');
      cy.contains('button', 'View Question Insight').click();
      cy.contains('You are viewing QUESTION:');
      cy.contains('Total Students');
      cy.contains('Passes')
      cy.contains('Total Submissions')

    });
});