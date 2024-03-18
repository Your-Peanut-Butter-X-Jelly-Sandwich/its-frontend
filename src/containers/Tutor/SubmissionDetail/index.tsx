"use client";

import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd'; // Import `message` for feedback
import Link from "next/link";
import Editor from "@monaco-editor/react";
import axios from 'axios'; 

type PropsType = {
  qn_id: string;
  submission_id: string;
};

const SubmissionDetailContainer: React.FC<PropsType> = ({ qn_id, submission_id }) => {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');

  const baseUrl = "http://127.0.0.1:8000";
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwODIyNDcyLCJpYXQiOjE3MTA3MzYwNzIsImp0aSI6ImU0NTg3MWU3NTZlNzQyZjY4NTA1M2RmZjZlMGUwZjk4IiwidXNlcl9pZCI6MTF9.0N5z7xR4kNUhUOdUKPO2Gy_lI-Yk-LH5RXHxjvxvVgY";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tutor/submission/${submission_id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCode(response.data.program);
        setFeedback(response.data.tutor_feedback || "");
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [submission_id]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      await axios.patch(`${baseUrl}/tutor/submission/${submission_id}`, {
        tutor_feedback: feedback,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
    float: 'right',
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
