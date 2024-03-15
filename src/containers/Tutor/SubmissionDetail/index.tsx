"use client";

import React from 'react';
import { Input, Button } from 'antd';
import Link from "next/link";
import Editor from "@monaco-editor/react";

type PropsType = {
  qn_id: string;
  submission_id: string;
};

const dummyCode = `# Dummy code data
def fib(n):
  if n <= 1:
    return n
  else:
    return fib(n-1) + fib(n-2)
`;

const backButtonStyle = {
  backgroundColor: '#1890ff',
  color: '#fff',
  borderColor: '#1890ff',
};

const submitButtonStyle = {
  backgroundColor: '#52c41a',
  color: '#fff',
  borderColor: '#52c41a',
  float: 'right', // Position the submit button to the right
};

const SubmissionDetailContainer: React.FC<PropsType> = ({ qn_id, submission_id }: PropsType) => {
  // Configuration for the Monaco Editor
  const editorOptions = {
    selectOnLineNumbers: true,
    readOnly: true,
    language: 'python', 
    theme: 'vs-light',
  };

  return (
    <div style={{ padding: 24, backgroundColor: "#F0F2F5", minHeight: "100vh" }}>
      <Link href={`/en/tutor/questions/1/submissions`} passHref>
        <Button style={backButtonStyle}>Back to Submissions</Button>
      </Link>
      <Button style={submitButtonStyle}>Submit Feedback</Button>
      <h1>Submissions for Question {qn_id}</h1>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 gap-5 p-3 overflow-hidden">
          <div className="flex-1 bg-white shadow rounded overflow-hidden">
            <Editor
              height="100%"
              language="python"
              theme="vs-light"
              value={dummyCode}
              options={editorOptions}
            />
          </div>
          <div className="flex-1 bg-white shadow rounded overflow-hidden">
            <Input.TextArea
              placeholder="Enter your feedback here..."
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailContainer;