describe('tutor add question', () => {
  before(() => {
    cy.tutorLogin('tut11@tutor.com', 'CS3213ITS');
  });

  it('tutor can add a question', () => {
    cy.contains('Add Question').click();
    cy.get('.ant-input').type('Remove Duplicates from Sorted Array');

    cy.get('input[placeholder="Select Due Date"]').click();
    cy.get('input[placeholder="Select Due Date"]').type('2023-01-01');

    //   cy.get('.ant-select-selection-search').click();
    //   cy.contains('.ant-select-item-option-content', 'Python').click();

    cy.contains('div', 'Edit').click();
    cy.get('.w-md-editor-text-input').type(
      '# Remove Duplicates from Sorted Array\nGiven an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. \
        The relative order of the elements should be kept the same. Then return the number of unique elements in nums. \
        Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:\
        Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially.\
        The remaining elements of nums are not important as well as the size of nums.\
        Return k.')
      cy.contains('div', 'Preview').click();

      cy.contains('div', 'Code Editor').click();
      cy.get('.view-lines').click();
      cy.get('.view-lines').type('def removeDuplicates(self, nums):\n');

      cy.contains('div', 'Test Cases').click();
      cy.get('input[placeholder="Input"]').eq(0).type('[1,1,2]');
      cy.get('input[placeholder="Expected Output"]').eq(0).type('2');
      cy.get('button').contains('Add Test Case').click();
      cy.get('input[placeholder="Input"]').eq(1).type('[0,0,1,1,1,2,2,3,3,4]');
      cy.get('input[placeholder="Expected Output"]').eq(1).type('5');

      cy.contains('button', 'Submit').click();

    });
  });
});
