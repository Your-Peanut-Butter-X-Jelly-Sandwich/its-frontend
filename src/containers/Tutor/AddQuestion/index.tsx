"use client"

import React, { useState } from 'react';
import { Button, message, Space, Input, Select, Divider, DatePicker  } from 'antd';
import moment from 'moment';
import MdEditor from '@uiw/react-md-editor';
import Editor from '@monaco-editor/react';

const AddQuestionContainer = () => {
  const [markdown, setMarkdown] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
  const [currentMode, setCurrentMode] = useState('markdown'); 
  const [language, setLanguage] = useState('python');
  const [codeContent, setCodeContent] = useState('');
  const [questionTitle, setQuestionTitle] = useState(''); 
  const [dueDate, setDueDate] = useState(null); 


  const handleEditorChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  const handleCodeEditorChange = (newCodeContent) => {
    setCodeContent(newCodeContent);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '' }]);
  };

  const removeLastTestCase = () => {
    if (testCases.length > 1) {
      setTestCases(testCases.slice(0, -1));
    } else {
      message.warning('At least one test case is required.');
    }
  };

  const updateTestCase = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleDueDateChange = (date, dateString) => {
    setDueDate(dateString); // Update the due date state
  };

  const handleSubmission = () => {
    const data = {
      language: language.toLowerCase(),
      question_title: questionTitle,
      question_statement: markdown,
      ref_program: codeContent,
      due_date: dueDate,
      test_cases: testCases.map(tc => ({ input: tc.input, output: tc.expectedOutput }))
    };

    console.log('Submission data:', data);
    
    const baseUrl = "http://127.0.0.1:8000";
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNjc5NTcxLCJpYXQiOjE3MTA1OTMxNzEsImp0aSI6IjJlNGZjYjE5MDJjNzQxNDQ5OTU3YTg4Nzg0MTM4MGNmIiwidXNlcl9pZCI6MTF9.4YliXiwUPmhhAgTsNayaAET_0RXL7FWMK2pE4iiLJdk"; 

    fetch(`${baseUrl}/tutor/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${authToken}`, 
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      message.success('Question added successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      message.error('An error occurred while adding the question.');
    });
  };

  const buttonStyle = {
    backgroundColor: '#1890ff',
    color: '#fff',
    borderColor: '#1890ff',
    height: '40px', 
  };
  

  const pageStyle = {
    padding: '20px',
    backgroundColor: '#f0f2f5', 
    minHeight: '100vh',
  };

  const flexContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    marginBottom: '20px', 
  };

  return (
    <div style={pageStyle}>
      <div style={flexContainerStyle}>
        <Input
          placeholder="Question Title"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          style={{ width: '70%' }} 
        />
        <DatePicker
          format="YYYY-MM-DD"
          placeholder="Select Due Date"
          onChange={handleDueDateChange}
          style={{ width: '28%' }} 
        />
      </div>
      {currentMode === 'markdown' ? (
        <div style={{ flexGrow: 1, overflow: 'auto', height: '85vh'}}>
          <MdEditor
            value={markdown}
            onChange={handleEditorChange}
            height='100%' 
          />
        </div>
      ) : (
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <div style={{ flex: 1, overflow: 'auto', padding: '10px' }}>

          {testCases.map((testCase, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider />}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#1890ff',
                  color: 'white',
                  marginRight: '10px',
                  fontSize: '12px'
                }}>{index + 1}</span>
                <div style={{ flex: 1 }}>
                  <Input
                    placeholder="Input"
                    value={testCase.input}
                    onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                  <Input
                    placeholder="Expected Output"
                    value={testCase.expectedOutput}
                    onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
            <Space>
              <Button style={buttonStyle} onClick={addTestCase} >Add Test Case</Button>
              <Button style={buttonStyle} onClick={removeLastTestCase} >Remove Last Test Case</Button>
            </Space>
          </div>
          <div style={{ flex: 2, padding: '10px' }}>
            <Select value={language} onChange={handleLanguageChange} style={{ width: '100%', marginBottom: '10px' }}>
              <Select.Option value="c">C</Select.Option>
              <Select.Option value="java">Java</Select.Option>
              <Select.Option value="python">Python</Select.Option>
            </Select>
            <Editor
              height="95%"
              language={language}
              theme="vs-dark"
              value={codeContent} 
              onChange={handleCodeEditorChange} 
            />
          </div>
        </div>
      )}
      <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Space>
          {currentMode === 'markdown' ? (
            <Button style={buttonStyle} onClick={() => setCurrentMode('testCases')}>
              Switch to Test Cases
            </Button>
          ) : (
            <Button style={buttonStyle} onClick={() => setCurrentMode('markdown')}>
              Switch to Question Editor
            </Button>
          )}
        </Space>
        <Space>
          <Button type="primary" style={buttonStyle} onClick={handleSubmission}>
            Submit
          </Button>
        </Space>
      </div>

    </div>
  );
};

export default AddQuestionContainer;
