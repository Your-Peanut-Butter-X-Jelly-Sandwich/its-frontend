'use client';

import React, { useEffect, useState } from 'react';
import { Button, message, Space, Input, Select, Divider, DatePicker } from 'antd';
import MdEditor from '@uiw/react-md-editor';
import Editor from '@monaco-editor/react';
import dayjs from 'dayjs';
import _ from 'lodash';
type QuestionData = {
  question: {
    id: number;
    test_cases: Array<{ pk: number; input: string; output: string }>;
    question_title: string;
    question_statement: string;
    ref_program: string;
    language: string;
    pub_date: string;
    due_date: string;
  };
  total_students: number;
  passes: number;
  total_submissions: number;
};

type QuestionStatistics = {
  total_students: number;
  passes: number;
  total_submissions: number;
};
type TestCaseType = {
  pk: number;
  input: string;
  output: string;
};
type PropsType = {
  qn_id: string;
};

const EditQuestionContainer: React.FC<PropsType> = ({ qn_id }) => {
  const baseUrl = 'http://127.0.0.1:8000';
  const authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNzY1OTc3LCJpYXQiOjE3MTA2Nzk1NzcsImp0aSI6ImUyNzJkYzZhZWI0ZjQ2NGNhMjhkMzQ1NGU3NjQwMTk1IiwidXNlcl9pZCI6MTF9.4_QeJTep_Z1SW4Ndf7TZSJU50it52CQ9_ffDIU8yWPg';
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [statistics, setStatistics] = useState<QuestionStatistics>({
    total_students: 0,
    passes: 0,
    total_submissions: 0,
  });

  const [currentMode, setCurrentMode] = useState('markdown');
  const [markdown, setMarkdown] = useState<string>('');
  const [testCases, setTestCases] = useState<Omit<TestCaseType, 'pk'>[]>([
    { input: '', output: '' },
  ]);
  const [language, setLanguage] = useState<'python' | 'c'>('python');
  const [codeContent, setCodeContent] = useState<string>('');
  const [questionTitle, setQuestionTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/tutor/question/${qn_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data: QuestionData = await response.json();
      setQuestionData(data);
      setStatistics({
        total_students: data.total_students,
        passes: data.passes,
        total_submissions: data.total_submissions,
      });
      console.log('Question data:', data);
      setQuestionTitle(data.question.question_title);
      setDueDate(data.question.due_date);
      setCodeContent(data.question.ref_program);
      setMarkdown(data.question.question_statement);
      const existingTestCases: TestCaseType[] = data.question.test_cases;
      _.forEach(existingTestCases, (value) => _.pick(value, ['input', 'output']));
      setTestCases(existingTestCases);
    } catch (error) {
      console.error('Failed to fetch question details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [testCases, dueDate, questionTitle, language, codeContent]);

  const handleEditorChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  const handleCodeEditorChange = (newCodeContent) => {
    setCodeContent(newCodeContent);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
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
      test_cases: testCases.map((tc) => ({
        input: tc.input,
        output: tc.output,
      })),
    };

    console.log('Submission data:', data);

    fetch(`${baseUrl}/tutor/question/${qn_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error('Request failed with error:', errorData);
            throw new Error('Request failed');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        message.success('Question edited successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        message.error('An error occurred while editing the question.');
      });

    console.log(data);
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
          value={dayjs(dueDate, 'YYYY-MM-DD')}
          onChange={handleDueDateChange}
          style={{ width: '28%' }}
        />
      </div>
      {currentMode === 'markdown' ? (
        <div style={{ flexGrow: 1, overflow: 'auto', height: '85vh' }}>
          <MdEditor value={markdown} onChange={handleEditorChange} height="100%" />
        </div>
      ) : (
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <div style={{ flex: 1, overflow: 'auto', padding: '10px' }}>
            {testCases.map((testCase, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider />}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#1890ff',
                      color: 'white',
                      marginRight: '10px',
                      fontSize: '12px',
                    }}
                  >
                    {index + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="Input"
                      value={testCase.input}
                      onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                      style={{ marginBottom: '10px' }}
                    />
                    <Input
                      placeholder="Expected Output"
                      value={testCase.output}
                      onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
            <Space>
              <Button style={buttonStyle} onClick={addTestCase}>
                Add Test Case
              </Button>
              <Button style={buttonStyle} onClick={removeLastTestCase}>
                Remove Last Test Case
              </Button>
            </Space>
          </div>
          <div style={{ flex: 2, padding: '10px' }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              style={{ width: '100%', marginBottom: '10px' }}
            >
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
      <Space
        style={{
          margin: '20px',
          padding: '10px',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
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

export default EditQuestionContainer;
