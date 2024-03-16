"use client"

import React, { useState } from 'react';
import { Button, message, Space, Input, Select, Divider } from 'antd';
import MdEditor from '@uiw/react-md-editor';
import Editor from '@monaco-editor/react';

const AddQuestionContainer = () => {
  const [markdown, setMarkdown] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
  const [currentMode, setCurrentMode] = useState('markdown'); // markdown or testCases
  const [language, setLanguage] = useState('python');
  const [codeContent, setCodeContent] = useState('');

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

  const handleSubmission = () => {
    console.log('Submission data:', { markdown, testCases, language });
    message.success('Submission successful!');
  };

  const buttonStyle = {
    backgroundColor: '#1890ff',
    color: '#fff',
    borderColor: '#1890ff',
  };

  const pageStyle = {
    padding: '20px',
    backgroundColor: '#f0f2f5', 
    minHeight: '100vh',
  };

  return (
    <div style={pageStyle}>
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
      <Space style={{ margin: '20px', padding: '10px', position: 'absolute', bottom: 0, left: 0 }}>
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
      <Space style={{ padding: '10px', position: 'absolute', bottom: 0, right: 0 }}>
        <Button type="primary" style={buttonStyle} onClick={handleSubmission}>
          Submit
        </Button>
      </Space>
    </div>
  );
};

export default AddQuestionContainer;
