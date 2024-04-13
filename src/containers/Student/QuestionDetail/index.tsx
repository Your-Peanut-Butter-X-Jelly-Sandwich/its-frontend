'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { Typography } from 'antd';
import {
  useGetQuestionDetailQuery,
  usePostCodeSubmissionMutation,
  useGetSubmissionDetailQuery,
} from '@/redux/apis/student';
import MDEditor from '@uiw/react-md-editor';
const { Text } = Typography;

type PropsType = {
  qn_id: string;
};

const QuestionDetailContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();
  const submission_id = new URLSearchParams(window.location.search).get('submission_id');

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [code, setCode] = React.useState<string | undefined>('# Write your code here\n');
  const { data } = useGetQuestionDetailQuery({ qn_id: Number(qn_id) });
  const [postCodeSubmission] = usePostCodeSubmissionMutation();

  const { data: submissionData } = useGetSubmissionDetailQuery({
    id: Number(submission_id),
  });

  React.useEffect(() => {
    if (submissionData) {
      setCode(submissionData.program);
    }
  }, [submissionData]);

  const problemStatement = `
  # **${data?.question_title}**  
  ${data?.question_statement}
  `;

  const handleSubmit = async () => {
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
    }
  };

  React.useEffect(() => {
    if (data) {
      if (Date.parse(data.due_date) < Date.parse(new Date().toISOString().split('T')[0])) {
        window.location.href = pathname.split('/').slice(0, 4).join('/');
      } else setIsLoading(false);
    }
  }, [data, pathname]);

  if (isLoading) return null;

  return (
    <div className="flex bg-white h-full">
      <div className="w-[49.95%] pl-7 pt-9 pb-9 pr-7">
        {/* Problem Statement */}
        <div className="h-full overflow-auto" data-color-mode="light">
          <MDEditor.Markdown source={problemStatement} />
        </div>
      </div>
      <div className="w-[0.1%] bg-black"></div>
      {/* Code Editor */}
      <div className="w-[49.95%] bg-gray-400">
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
          <button
            id="submit-button"
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionDetailContainer;
