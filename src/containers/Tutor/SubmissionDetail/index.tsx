"use client";

import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd'; 
import Link from "next/link";
import Editor from "@monaco-editor/react";
import { useGetSubmissionDetailQuery, useUpdateSubmissionDetailMutation } from "@/redux/apis/tutor/SubmissionDetail";

const SubmissionDetailContainer: React.FC<SubmissionDataType> = ({ qn_id, submission_id }) => {
  const [feedback, setFeedback] = useState('');
  const { data: submissionDetail, isFetching, refetch } = useGetSubmissionDetailQuery(submission_id);
  const [updateSubmissionDetail] = useUpdateSubmissionDetailMutation();
  
  useEffect(() => {
    if (submissionDetail) {
      setFeedback(submissionDetail.tutor_feedback);
    }
  }, [submissionDetail]);

  const code = submissionDetail?.program || '';
  
  if (isFetching) return <div>Loading...</div>;
  
  const handleFeedbackChange = (e:any) => {
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
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      message.error('Failed to submit feedback');
    }
  };

  const backButtonStyle = {
    backgroundColor: '#1890ff',
    color: '#fff',
    borderColor: '#1890ff',
  };

  const submitButtonStyle = {
    backgroundColor: '#52c41a',
    color: '#fff',
    borderColor: '#52c41a',
    float: 'right' as 'right',
  };

  const editorOptions = {
    selectOnLineNumbers: true,
    readOnly: true,
    language: 'python', 
    theme: 'vs-light',
  };


  return (
    <div style={{ padding: 24, backgroundColor: "#F0F2F5", minHeight: "100vh" }}>
      <Link href={`/en/tutor/questions/${qn_id}/submissions`} passHref>
        <Button style={backButtonStyle}>Back to Submissions</Button>
      </Link>
      <Button style={submitButtonStyle} onClick={handleSubmitFeedback}>Submit Feedback</Button>
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
