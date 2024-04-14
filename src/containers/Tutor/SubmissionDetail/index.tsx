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

  const [editor, setEditor] = React.useState<any>();
  const [monaco, setMonaco] = React.useState<any>();
  const [fixes, setFixes] = React.useState<any>([]);

  React.useEffect(() => {
    if (submissionDetail) {
      setFixes(JSON.parse(submissionDetail.its_feedback_fix_tutor));
    }
  }, [submissionDetail]);

  React.useEffect(() => {
    if (editor && monaco && fixes) {
      const markers: any = [];
      fixes?.fixes?.map((fix: any) => {
        markers.push({
          startLineNumber: fix.lineNumber,
          startColumn: editor.getModel().getLineFirstNonWhitespaceColumn(fix.lineNumber),
          endLineNumber: fix.lineNumber,
          endColumn: editor.getModel().getLineLength(fix.lineNumber) + 1,
          message: fix.newExpr ?? 'no fix available',
          severity: monaco.MarkerSeverity.Error,
        });
      });
      monaco.editor.setModelMarkers(editor.getModel(), 'owner', markers);
    }
  }, [editor, monaco, fixes]);

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
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 gap-5 p-3 overflow-hidden">
          <div className="flex-1 bg-white shadow rounded overflow-hidden">
            <Editor
              height="70vh"
              language="python"
              theme="vs-light"
              value={code}
              onMount={(editor, monaco) => {
                setEditor(editor);
                setMonaco(monaco);
              }}
            />
            <div className="p-5">
              <h1 className="font-bold">Fixes:</h1>
              {fixes?.fixes?.length === 0 && <p>No fixes available</p>}
              <ul>
                {fixes?.fixes?.map((fix: any) => (
                  <li key={fix.lineNumber}>
                    <p>
                      - <span className="text-red-400">Line {fix.lineNumber}</span>:{' '}
                      {fix.newExpr ?? 'no fix available'}
                    </p>
                  </li>
                ))}
              </ul>
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
