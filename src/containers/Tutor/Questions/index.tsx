'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useGetQuestionsQuery,
  useLazyGetQuestionsQuery,
  useDeleteQuestionMutation,
} from '@/redux/apis/tutor/Questions';

const QuestionsContainer: React.FC<PropsType> = ({ qn_id }) => {
  const pathname = usePathname();
  const [questionList, setQuestionList] = useState();
  const [getQuestions] = useLazyGetQuestionsQuery();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const fetchQuestionList = async () => {
    const result = await getQuestions().unwrap();
    setQuestionList(result.questions);
  };

  useEffect(() => {
    fetchQuestionList();
  }, []);

  const handleDeleteQuestion = async (pk: any) => {
    try {
      await deleteQuestion(pk).unwrap();
      alert('Question deleted successfully'); // Temporarily replacing message.success
      fetchQuestionList();
    } catch (err) {
      alert('Error deleting question'); // Temporarily replacing message.error
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="mb-5">
        <Link href={`/en/tutor`} passHref className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Back to Dashboard
        </Link>
      </div>
      <h4 className="text-lg font-semibold mb-4">Here you can see ALL questions.</h4>
      <div className="space-y-4">
        {questionList && questionList.map((item: any) => (
          <div key={item.pk} className="bg-white p-4 shadow rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.question_title}</p>
                <p>Published: {item.pub_date}</p>
                <p>Due by: {item.due_date}</p>
              </div>
              <div className="flex space-x-2">
                <Link href={`${pathname}/${item.pk}`} passHref className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                  View Question Insight
                </Link>
                <button onClick={() => handleDeleteQuestion(item.pk)} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsContainer;
