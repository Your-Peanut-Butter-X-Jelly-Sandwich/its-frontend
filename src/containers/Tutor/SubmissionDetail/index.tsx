'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import Link from 'next/link';
import Editor from '@monaco-editor/react';
import {
  useGetSubmissionDetailQuery,
  useUpdateSubmissionDetailMutation,
} from '@/redux/apis/tutor/SubmissionDetail';
import CustomButton from '../AddQuestion/components/Buttons/CustomButton';
import NavButton from '../AddQuestion/components/Buttons/NavButton';
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
  const [hints, sethints] = React.useState<any>([]);

  useEffect(() => {
    if (submissionDetail) {
      sethints(JSON.parse(submissionDetail.its_feedback_fix_tutor));
    }
  }, [submissionDetail]);

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
    <div className="flex flex-col p-5 min-h-0 h-full gap-5">
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
      <div className="flex flex-col min-h-0 grow shrink overflow-scroll">
        <div className="flex grow shrink">
          <div className="flex-1 bg-white shadow rounded overflow-hidden">
            <Editor
              height="70vh"
              language="python"
              theme="vs-light"
              value={code}
              options={editorOptions}
            />
            <div className="text-gray-600 text-sm bold p-2">
              Hints: {hints.length > 0 ? hints : 'No hints available'}
            </div>
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
