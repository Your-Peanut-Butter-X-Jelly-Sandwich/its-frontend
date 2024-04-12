'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { Button, Typography } from 'antd';
import { useGetQuestionDetailQuery, usePostCodeSubmissionMutation } from '@/redux/apis/student';
import MDEditor from '@uiw/react-md-editor';
const { Text } = Typography;

type PropsType = {
  qn_id: string;
};

const QuestionDetailContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string | undefined>('# Write your code here\n');
  const { data } = useGetQuestionDetailQuery({ qn_id: Number(qn_id) });
  const [postCodeSubmission] = usePostCodeSubmissionMutation();

  const problemStatement = `
  # **${data?.question_title}**

  ${data?.question_statement}
  `;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (code) {
        const result = await postCodeSubmission({
          qn_id: Number(qn_id),
          language: data?.language || '',
          program: code,
        });

        if ('data' in result && result.data) {
          window.location.href = `${pathname}/past-submissions`;
        }
      }
    } catch (error) {
      alert('Error in submitting the code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-white h-full">
      <div className="w-[50%] pl-7 pt-9 pb-9">
        {/* Problem Statement */}
        <div className="h-full overflow-auto" data-color-mode="light">
          <MDEditor.Markdown source={problemStatement} />
        </div>
      </div>
      {/* Code Editor */}
      <div className="w-[50%] bg-gray-400">
        <div className="h-[4%] flex justify-end">
          <Text className="mr-4 mt-1">{data?.language}</Text>
        </div>
        <Editor
          height="90%"
          defaultLanguage={data?.language}
          value={code}
          onChange={(newValue, e) => setCode(newValue)}
        />
        <div className="h-[6%] w-full flex justify-center items-center">
          <Button
            id="submit-button"
            type="primary"
            className="bg-blue-500"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default QuestionDetailContainer;
