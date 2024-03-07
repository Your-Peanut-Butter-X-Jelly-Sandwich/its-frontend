import React from 'react';
import { NextPage } from 'next';
import SubmissionDetailContainer from '@/containers/Student/SubmissionDetail';

type ParamsType = {
  params: {
    qn_id: string;
    submission_id: string;
  };
};

const PastSubmissionDetailPage: NextPage<ParamsType> = ({ params }) => {
  return (
    <div style={{ padding: '20px' }}>
      <SubmissionDetailContainer submission_id={params.submission_id} />
    </div>
  );
};

export default PastSubmissionDetailPage;
