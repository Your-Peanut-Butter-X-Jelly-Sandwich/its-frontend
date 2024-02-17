"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
type PropsType = {
  assignment_id: string;
  qn_id: string;
};

const QuestionDetailContainer: React.FC<PropsType> = ({
  assignment_id,
  qn_id,
}: PropsType) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="text-2xl">
        You are seeing <strong>QUESTION: {qn_id} under ASSIGNMENT: { assignment_id}</strong>
      </div>
      This pages shows the specific question. It contains the IDE and Problem
      statement. Please refer to leetcode for the specific design.{" "}
      <span className="text-red-600 font-bold text-2xl">
        This is our task for week 6!
      </span>
      <div>
        If student has submitted this question, there will be a button for them
        to see past submissions
        <div className="flex justify-center">
          <button className="bg-black text-white p-5 rounded-lg">
            <Link
              href={`${pathname}/past-submissions`}
            >
              See Past Submissions
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionDetailContainer;
