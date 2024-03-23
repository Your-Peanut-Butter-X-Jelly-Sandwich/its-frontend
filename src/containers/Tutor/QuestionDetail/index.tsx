'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLazyGetQuestionDetailQuery } from '@/redux/apis/tutor/QuestionDetail';

// Assuming PropsType and QuestionData are defined elsewhere in your codebase.

const QuestionDetailContainer: React.FC<PropsType> = ({ qn_id }) => {
  const pathname = usePathname();
  const [getQuestionDetail] = useLazyGetQuestionDetailQuery();
  const [questionDetail, setQuestionDetail] = useState<QuestionData | undefined>(undefined);

  const fetchQuestionDetail = async () => {
    const result = await getQuestionDetail({ qn_id }).unwrap();
    setQuestionDetail(result);
  };
  
  useEffect(() => {
    fetchQuestionDetail();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-5">
        <Link href={`/en/tutor/questions`} passHref>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mb-5">Back to Question List</button>
        </Link>
      </div>
      {/* Displaying both question ID and title */}
      <div className="text-2xl mb-6">
        You are viewing <strong>QUESTION: {qn_id} - {questionDetail?.question.question_title}</strong>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-6 bg-white text-center rounded shadow">
          <div className="text-lg font-semibold mb-2">Total Students</div>
          <div className="text-green-600 text-3xl">{questionDetail?.total_students}</div>
        </div>
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-6 bg-white text-center rounded shadow">
          <div className="text-lg font-semibold mb-2">Passes</div>
          <div className="text-red-600 text-3xl">{questionDetail?.passes}</div>
        </div>
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-6 bg-white text-center rounded shadow">
          <div className="text-lg font-semibold mb-2">Total Submissions</div>
          <div className="text-blue-600 text-3xl">{questionDetail?.total_submissions}</div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <div className="inline-flex gap-2 justify-center">
          <a href={`${pathname}/edit`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Edit Question</a>
          <a href={`${pathname}/submissions`} className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-300">View Student Submissions</a>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailContainer;
