import React from 'react';
import CustomButton from '../../Buttons/CustomButton/CustomButton';
import NavButton from '../../Buttons/NavButton/NavButton';

// @ts-ignore
const QuestionList = ({ questionList, pathname, handleDeleteQuestion }) => {
  return (
    <div className="space-y-4">
      {questionList &&
        questionList.map((item: ITutorGetQuestionResponse) => (
          <div key={item.pk} className="bg-white p-4 shadow rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.question_title}</p>
                <p>Published: {item.pub_date}</p>
                <p>Due by: {item.due_date}</p>
              </div>
              <div className="flex space-x-2">
                <NavButton
                  buttonText="View Question Insight"
                  href={`${pathname}/${item.pk}`}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                />
                <CustomButton
                  onClick={() => handleDeleteQuestion(item.pk)}
                  label="Delete"
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestionList;
