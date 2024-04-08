describe('tutor add question', () => {
  before(() => {
    cy.tutorLogin('tut11@tutor.com', 'CS3213ITS');
  });

  it('tutor can add a question', () => {
    cy.contains('Check Questions').click();
    cy.contains('Here you can see ALL questions.');
    cy.contains('button', 'View Question Insight').click();
    cy.contains('You are viewing QUESTION:');
    cy.contains('Total Students');
    cy.contains('Passes');
    cy.contains('Total Submissions');
    cy.contains('button', 'Edit Question').click();

    cy.get('.ant-input').type('Remove Duplicates from Already Sorted Array');

    cy.get('input[placeholder="Select Due Date"]').click();
    cy.get('input[placeholder="Select Due Date"]').type('2023-01-02');

    //   cy.get('.ant-select-selection-search').click();
    //   cy.contains('.ant-select-item-option-content', 'Python').click();

    // cy.contains('div', 'Edit').click();
    // cy.get('.w-md-editor-text-input').type('# Remove Duplicates from Sorted Array\nGiven an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. \
    //     The relative order of the elements should be kept the same. Then return the number of unique elements in nums. \
    //     Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:\
    //     Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially.\
    //     The remaining elements of nums are not important as well as the size of nums.\
    //     Return k.')
    // cy.contains('div', 'Preview').click();

    cy.contains('div', 'Code Editor').click();
    cy.get('.view-lines').click();
    cy.get('.view-lines').type('def removeDuplicates(self, nums):\n');

    cy.contains('div', 'Test Cases').click();
    cy.get('button').contains('Remove Last Test Case').click();

    cy.contains('button', 'Submit').click();
  });
});
