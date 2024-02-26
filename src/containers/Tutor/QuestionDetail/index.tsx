"use client";
import React from "react";
import { usePathname } from "next/navigation";

type PropsType = {
  qn_id: string;
};

const QuestionDetailContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="text-2xl">
        You are seeing <strong>QUESTION: {qn_id}</strong>
      </div>
      This pages shows the statistics for this specific question.
    </div>
  );
};
export default QuestionDetailContainer;
