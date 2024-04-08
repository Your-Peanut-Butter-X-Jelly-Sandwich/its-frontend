'use client';

import React, { useState } from 'react';
import { Button, message, Space, Input, Select, Divider, DatePicker } from 'antd';
import { useAddQuestionMutation } from '@/redux/apis/tutor/AddQuestion';
import CustomButton from '../components/Buttons/CustomButton/CustomButton';
import SubHeader from '../components/SubHeaders/SubHeader';
import MdEditorTabs from '../components/Editors/MdEditor/MdEditor';
import CodeEditor from '../components/Editors/CodeEditor/CodeEditor';
import TestCases from '../components/Editors/TestCaseEditor/TestCaseEditor';

const AddQuestionContainer = () => {
  const [markdown, setMarkdown] = useState('');
  //const [testCases, setTestCases] = useState<ITutorTestCase>([{input: '', expectedOutput: '' }]);
  const [testCases, setTestCases] = useState<ITutorTestCase[]>([{ input: '', output: '' }]);
  const [language, setLanguage] = useState('python');
  const [codeContent, setCodeContent] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const [currentRightTab, setCurrentRightTab] = useState('editor');
  const [currentLeftTab, setCurrentLeftTab] = useState('edit'); // New state for managing left tabs

  const [addQuestion, { isLoading }] = useAddQuestionMutation();

  const handleEditorChange = (newMarkdown: any) => {
    setMarkdown(newMarkdown);
  };

  const handleCodeEditorChange = (newCodeContent: any) => {
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

  const updateTestCase = (index: any, field: any, value: any) => {
    const updatedTestCases = [...testCases];
    // @ts-ignore
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const handleDueDateChange = (date: string, dateString: string) => {
    setDueDate(dateString); // Update the due date state
  };

  const handleSubmission = async () => {
    const questionData = {
      question_title: questionTitle,
      question_statement: markdown,
      ref_program: codeContent,
      language: language as 'python' | 'c',
      due_date: dueDate,
      test_cases: testCases.map((testCase, index) => ({
        pk: index,
        input: testCase.input,
        expectedOutput: testCase.output,
      })),
    };

    try {
      const result = await addQuestion(questionData).unwrap();
      message.success('Question added successfully!');
      // wait for 3 senconds
      setTimeout(() => {
        window.location.href = '/en/tutor/questions/';
      }, 1500);
    } catch (error) {
      message.error('An error occurred while adding the question.');
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <SubHeader
        questionTitle={questionTitle}
        setQuestionTitle={setQuestionTitle}
        handleDueDateChange={handleDueDateChange}
        handleLanguageChange={handleLanguageChange}
        language={language}
        dueDate={dueDate}
      />
      <div className="flex flex-col h-[87vh]">
        <div className="flex flex-grow">
          {/* Left side: Markdown Editor and Preview */}
          <MdEditorTabs
            // @ts-ignore
            currentLeftTab={currentLeftTab}
            setCurrentLeftTab={setCurrentLeftTab}
            markdown={markdown}
            handleEditorChange={handleEditorChange}
          />
          {/* Right side: Code Editor and Test Cases */}
          <div className="w-1/2 flex flex-col pl-1 pr-3">
            <div className="flex mb-4">
              <div
                className={`cursor-pointer p-2 ${currentRightTab === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setCurrentRightTab('editor')}
              >
                Code Editor
              </div>
              <div
                className={`cursor-pointer p-2 ${currentRightTab === 'testCases' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setCurrentRightTab('testCases')}
              >
                Test Cases
              </div>
            </div>
            {currentRightTab === 'editor' && (
              <CodeEditor
                language={language}
                codeContent={codeContent}
                handleCodeEditorChange={handleCodeEditorChange}
              />
            )}

            {currentRightTab === 'testCases' && (
              <TestCases
                // @ts-ignore
                testCases={testCases}
                updateTestCase={updateTestCase}
                addTestCase={addTestCase}
                removeLastTestCase={removeLastTestCase}
              />
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-5">
        <CustomButton
          className="bg-blue-600 text-white border border-blue-600"
          onClick={handleSubmission}
          label="Submit"
        />
      </div>
    </div>
  );
};

export default AddQuestionContainer;
