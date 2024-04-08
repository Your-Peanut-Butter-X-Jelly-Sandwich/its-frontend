'use client';

import React from 'react';
import PersonalInfo from '../components/PersonalInfo';
import QuestionList from '../components/QuestionList';
import { useGetDashboardStatsQuery } from '@/redux/apis/tutor';

const TutorDashboardContainer: React.FC = () => {
  const { data } = useGetDashboardStatsQuery();
  return (
    <div className="h-full py-6 px-12 max-h-full">
      <div className="flex flex-row gap-10 h-full max-h-full">
        <div className="basis-1/4">
          <PersonalInfo students={data?.students || []} />
        </div>
        <div className="flex flex-col basis-3/4 max-h-full">
          <div className="flex flex-row gap-5 flex-1 overflow-hidden">
            <div className="basis-1/2 flex flex-col">
              <QuestionList questions={data?.questions_due_in_a_week || []} time="week" />
            </div>
            <div className="basis-1/2 flex flex-col">
              <QuestionList questions={data?.questions_due_in_a_month || []} time="month" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardContainer;
