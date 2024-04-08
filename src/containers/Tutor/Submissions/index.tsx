'use client';

import React, { useEffect, useState } from 'react';
import { useGetSubmissionsQuery } from '@/redux/apis/tutor/Submissions';
import SubmissionList from '../components/Lists/SubmissionList/SubmissionList';
import NavButton from '../components/Buttons/NavButton/NavButton';

const SubmissionsContainer: React.FC<ITutorQuestionDetailRequest> = ({ qn_id }) => {
  const { data: submissions, isLoading, isError } = useGetSubmissionsQuery(qn_id);

  if (isLoading) return <div className="text-center py-5">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 py-5">
        Error occurred while fetching submissions.
      </div>
    );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-5">
        <NavButton
          href={`/en/tutor/questions/${qn_id}`}
          buttonText="Back to Question List"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        />
      </div>
      <h1 className="text-xl font-semibold mb-4">Submissions for Question {qn_id} </h1>
      <SubmissionList submissions={submissions} qn_id={qn_id} />
    </div>
  );
};

export default SubmissionsContainer;
