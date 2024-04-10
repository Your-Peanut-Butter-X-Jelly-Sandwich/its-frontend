'use client';

import React, { useEffect, useState } from 'react';
import { Button, message, Space, Input, Select, Divider, DatePicker } from 'antd';
import _ from 'lodash';
import {
  useGetQuestionDetailQuery,
  useUpdateQuestionDetailMutation,
} from '@/redux/apis/tutor/EditQuestion';
import SubHeader from '../AddQuestion/components/SubHeaders';
import MdEditorTabs from '../AddQuestion/components/Editors/MdEditor';
import CodeEditor from '../AddQuestion/components/Editors/CodeEditor';
import TestCases from '../AddQuestion/components/Editors/TestCaseEditor';
import CustomButton from '../AddQuestion/components/Buttons/CustomButton';
import getLocale from '@/common/utils/extractLocale';
import { usePathname } from 'next/navigation';

const EditQuestionContainer: React.FC<ITutorQuestionDetailRequest> = ({ qn_id }) => {
  const { data: questionData, error, isLoading } = useGetQuestionDetailQuery(qn_id);
  const [updateQuestionDetail, { isLoading: isUpdating, isSuccess }] =
    useUpdateQuestionDetailMutation();
  const pathname = usePathname();
  const locale = getLocale(pathname);

  useEffect(() => {
    if (questionData) {
      setQuestionTitle(questionData.question.question_title);
      setDueDate(questionData.question.due_date);
      setCodeContent(questionData.question.ref_program);
      setMarkdown(questionData.question.question_statement);
      // @ts-ignore
      setTestCases(questionData.question.test_cases.map((tc) => _.omit(tc, 'pk')));
      setLanguage(questionData.question.language);
    }
  }, [questionData]);

  const [currentMode, setCurrentMode] = useState('markdown');
  const [markdown, setMarkdown] = useState<string>('');
  const [testCases, setTestCases] = useState<Omit<ITutorTestCaseResponse, 'pk'>[]>([
    { input: '', output: '' },
  ]);
  const [language, setLanguage] = useState<ITutorLanguage>('python');
  const [codeContent, setCodeContent] = useState<string>('');
  const [questionTitle, setQuestionTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [currentLeftTab, setCurrentLeftTab] = useState('edit'); // New state for managing left tabs
  const [currentRightTab, setCurrentRightTab] = useState('editor');
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

  const handleLanguageChange = (value: any) => {
    setLanguage(value);
  };

  const handleDueDateChange = (date: any, dateString: any) => {
    setDueDate(dateString); // Update the due date state
  };

  const handleSubmission = async () => {
    if (!questionData) {
      message.error('No question data available for submission.');
      return;
    }

    const submissionData = {
      question: {
        id: qn_id,
        question_title: questionTitle,
        question_statement: markdown,
        ref_program: codeContent,
        language,
        due_date: dueDate,
        test_cases: testCases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.output,
        })),
        total_students: questionData.total_students,
        passes: questionData.passes,
        total_submissions: questionData.total_submissions,
      },
    };

    try {
      // @ts-ignore
      await updateQuestionDetail(submissionData).unwrap();
      message.success('Question edited successfully!');
      // wait for 3 senconds
      setTimeout(() => {
        window.location.href = `/${locale}/tutor/questions/`;
      }, 1500);
    } catch (err) {
      console.error('Error during submission:', err);
      message.error('An error occurred while editing the question.');
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

export default EditQuestionContainer;
