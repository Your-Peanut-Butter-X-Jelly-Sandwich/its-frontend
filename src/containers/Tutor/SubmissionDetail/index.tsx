'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import Link from 'next/link';
import Editor from '@monaco-editor/react';
import {
  useGetSubmissionDetailQuery,
  useUpdateSubmissionDetailMutation,
} from '@/redux/apis/tutor/SubmissionDetail';
import CustomButton from '../components/Buttons/CustomButton/CustomButton';
import NavButton from '../components/Buttons/NavButton/NavButton';
import getLocale from '@/common/utils/extractLocale';
import { usePathname } from 'next/navigation';

const SubmissionDetailContainer: React.FC<ITutorSubmissionRequest> = ({ qn_id, submission_id }) => {
  const [feedback, setFeedback] = useState('');
  const {
    data: submissionDetail,
    isFetching,
    refetch,
  } = useGetSubmissionDetailQuery(submission_id);
  const [updateSubmissionDetail] = useUpdateSubmissionDetailMutation();
  const pathname = usePathname();
  const locale = getLocale(pathname);

  useEffect(() => {
    if (submissionDetail) {
      setFeedback(submissionDetail.tutor_feedback);
    }
  }, [submissionDetail]);

  const code = submissionDetail?.program || '';

  if (isFetching) return <div>Loading...</div>;

  const handleFeedbackChange = (e: any) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      const submissionUpdate = {
        pk: submission_id, // Primary key to identify the submission.
        tutor_feedback: feedback, // Updated feedback to be sent.
      };
      console.log(submissionUpdate);

      await updateSubmissionDetail(submissionUpdate).unwrap(); // Execute the mutation.

      // Call refetch to get the latest submission detail after update
      await refetch();
      message.success('Feedback submitted successfully');
      setTimeout(() => {
        window.location.href = `/${locale}/tutor/questions/${qn_id}/submissions`;
      }, 1500);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      message.error('Failed to submit feedback');
    }
  };

  const editorOptions = {
    selectOnLineNumbers: true,
    readOnly: true,
    language: 'python',
    theme: 'vs-light',
  };

  return (
    <div style={{ padding: 24, backgroundColor: '#F0F2F5', minHeight: '100vh' }}>
      <div className="flex justify-between items-stretch w-full">
        <NavButton
          href={`/${locale}/tutor/questions/${qn_id}/submissions`}
          buttonText="Back to Submissions"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        />
        <CustomButton
          onClick={handleSubmitFeedback}
          label="Submit Feedback"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        />
      </div>

      <h1>Submissions for Question {qn_id}</h1>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 gap-5 p-3 overflow-hidden">
          <div className="flex-1 bg-white shadow rounded overflow-hidden">
            <Editor
              height="100%"
              language="python"
              theme="vs-light"
              value={code}
              options={editorOptions}
            />
          </div>
          <div className="flex-1 bg-white shadow rounded overflow-hidden">
            <Input.TextArea
              placeholder="Enter your feedback here..."
              style={{ width: '100%', height: '100%' }}
              value={feedback}
              onChange={handleFeedbackChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailContainer;
