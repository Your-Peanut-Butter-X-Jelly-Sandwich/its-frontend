'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLazyGetQuestionDetailQuery } from '@/redux/apis/tutor/QuestionDetail';
import NavButton from '../components/Buttons/NavButton/NavButton';
import CustomButton from '../components/Buttons/CustomButton/CustomButton';
import QuestionStats from '../components/Stats/QuestionStats/QuestionStats';

const QuestionDetailContainer: React.FC<ITutorQuestionDetailRequest> = ({ qn_id }) => {
  const pathname = usePathname();
  const [getQuestionDetail] = useLazyGetQuestionDetailQuery();
  const [questionDetail, setQuestionDetail] = useState<ITutorQuestionDetailResponse | undefined>(
    undefined
  );

  const fetchQuestionDetail = async () => {
    const result = await getQuestionDetail({ qn_id }).unwrap();
    setQuestionDetail(result);
  };

  useEffect(() => {
    fetchQuestionDetail();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <NavButton
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mb-5"
        href="/en/tutor/questions"
        buttonText="Back to Question List"
      />
      {/* Displaying both question ID and title */}
      <div className="text-2xl mb-6">
        You are viewing{' '}
        <strong>
          QUESTION: {qn_id} - {questionDetail?.question.question_title}
        </strong>
      </div>

      <QuestionStats questionDetail={questionDetail} />

      <div className="mt-6 text-center">
        <div className="inline-flex gap-2 justify-center">
          <CustomButton
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            onClick={() => {
              window.location.href = `${pathname}/edit`;
            }}
            label="Edit Question"
          />
          <CustomButton
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
            onClick={() => {
              window.location.href = `${pathname}/submissions`;
            }}
            label="View Student Submissions"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailContainer;
