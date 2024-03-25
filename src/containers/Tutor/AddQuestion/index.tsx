'use client';

import React, { useState } from 'react';
import { Button, message, Space, Input, Select, Divider, DatePicker } from 'antd';
import MdEditor from '@uiw/react-md-editor';
import Editor from '@monaco-editor/react';
import { useAddQuestionMutation } from '@/redux/apis/tutor/AddQuestion';
import CustomButton from '../components/Buttons/CustomButton/CostomButton';

const AddQuestionContainer = () => {
  const [markdown, setMarkdown] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
  const [language, setLanguage] = useState('python');
  const [codeContent, setCodeContent] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [currentRightTab, setCurrentRightTab] = useState('editor');
  const [currentLeftTab, setCurrentLeftTab] = useState('edit'); // New state for managing left tabs

  const [addQuestion, { isLoading }] = useAddQuestionMutation();

  const handleEditorChange = (newMarkdown:any) => {
    setMarkdown(newMarkdown);
  };

  const handleCodeEditorChange = (newCodeContent:any) => {
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

  const updateTestCase = (index:any, field:any, value:any) => {
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

  const handleSubmission = async () => {
    const questionData = {
      question_title: questionTitle,
      question_statement: markdown,
      ref_program: codeContent,
      language: language,
      due_date: dueDate,
      test_cases: testCases.map((testCase, index) => ({
        pk: index,
        input: testCase.input,
        output: testCase.expectedOutput,
      })),
    };

    try {
      const result = await addQuestion(questionData).unwrap();
      message.success('Question added successfully!');
    } catch (error) {
      message.error('An error occurred while adding the question.');
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-5">
        <Input placeholder="Question Title" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} className="basis-7/12 grow-0 shrink-0 mr-4"/>
        <DatePicker format="YYYY-MM-DD" placeholder="Select Due Date" onChange={handleDueDateChange} className="basis-3/12 grow-0 shrink-0 mr-4"/>
        <Select value={language} onChange={handleLanguageChange} className="basis-2/12 grow-0 shrink-0" placeholder="Select Language">
          <Select.Option value="c">C</Select.Option>
          <Select.Option value="python">Python</Select.Option>
        </Select>
      </div>
      <div className="flex flex-col h-[87vh]">
        <div className="flex flex-grow">
          {/* Left side: Markdown Editor and Preview */}
          <div className="w-1/2 flex flex-col">
            <div className="flex mb-4">
              <div className={`cursor-pointer p-2 ${currentLeftTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`} onClick={() => setCurrentLeftTab('edit')}>
                Edit
              </div>
              <div className={`cursor-pointer p-2 ${currentLeftTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`} onClick={() => setCurrentLeftTab('preview')}>
                Preview
              </div>
            </div>
            <div className="flex-grow overflow-auto">
              <MdEditor value={markdown} onChange={handleEditorChange} preview={currentLeftTab} height="100%" />
            </div>
          </div>
          {/* Right side: Code Editor and Test Cases */}
          <div className="w-1/2 flex flex-col pl-1 pr-3"> 
            <div className="flex mb-4">
              <div className={`cursor-pointer p-2 ${currentRightTab === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`} onClick={() => setCurrentRightTab('editor')}>
                Code Editor
              </div>
              <div className={`cursor-pointer p-2 ${currentRightTab === 'testCases' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`} onClick={() => setCurrentRightTab('testCases')}>
                Test Cases
              </div>
            </div>
              {currentRightTab === 'editor' && (
                <div className="flex-grow overflow-auto pl-3 pr-1">
                  <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={codeContent}
                    onChange={handleCodeEditorChange}
                  />
                </div>
              )}
  
            {currentRightTab === 'testCases' && (
              <div className="flex-grow overflow-auto p-2.5">
                {testCases.map((testCase, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    <div className="mb-2.5">
                      <Input
                        placeholder="Input"
                        value={testCase.input}
                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                      />
                      <Input
                        placeholder="Expected Output"
                        value={testCase.expectedOutput}
                        onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                      />
                    </div>
                  </React.Fragment>
                ))}
                <Space>
                  <CustomButton className="bg-blue-600 text-white border border-blue-600 h-10" onClick={addTestCase} label='AddTestCase' />
                  <CustomButton className="bg-red-600 text-white border border-red-600 h-10" onClick={removeLastTestCase} label='Remove Last Test Case' />
                </Space>
              </div>
            )}
          </div>
        </div>
      </div>
  
      <div className="fixed bottom-5 right-5">
        <CustomButton className="bg-blue-600 text-white border border-blue-600" onClick={handleSubmission} label='Submit' />
      </div>
    </div>
  );
  

};

export default AddQuestionContainer;

