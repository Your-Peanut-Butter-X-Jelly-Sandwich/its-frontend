describe('tutor view submissions', () => {
    before(() => {
      cy.tutorLogin('tut11@tutor.com', 'CS3213ITS');
    });

    it('tutor can view submissions', () => {
      cy.contains('Check Questions').click();
      cy.contains('Here you can see ALL questions.');
      cy.get('button[class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"]').eq(5).click();
      cy.contains('You are viewing QUESTION:');
      cy.contains('Total Students');
      cy.contains('Passes')
      cy.contains('Total Submissions')
      cy.contains('button', 'View Student Submissions').click();
      cy.contains('Submissions for Question');
      cy.contains('button', 'View Detail').click();
      cy.contains('Submissions for Question');
      cy.get('textarea[placeholder="Enter your feedback here..."]').type('Good Job!');
      cy.contains('button', 'Submit Feedback').click();

    //   cy.contains('STUDENT EMAIL');
    //   cy.contains('SUBMISSION NUMBER');
    //   cy.contains('SCORE');
    //   cy.contains('SUBMISSION TIME');
    });
});