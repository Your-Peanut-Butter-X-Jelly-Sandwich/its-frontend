import React from 'react';

// @ts-ignore
const QuestionStats = ({ questionDetail }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-6 bg-white text-center rounded shadow">
        <div className="text-lg font-semibold mb-2">Total Students</div>
        <div className="text-green-600 text-3xl">{questionDetail?.total_students}</div>
      </div>
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-6 bg-white text-center rounded shadow">
        <div className="text-lg font-semibold mb-2">Passes</div>
        <div className="text-red-600 text-3xl">{questionDetail?.passes}</div>
      </div>
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-6 bg-white text-center rounded shadow">
        <div className="text-lg font-semibold mb-2">Total Submissions</div>
        <div className="text-blue-600 text-3xl">{questionDetail?.total_submissions}</div>
      </div>
    </div>
  );
};

export default QuestionStats;
