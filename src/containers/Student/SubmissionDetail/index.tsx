"use client";
import React from "react";
type PropsType = {
  submission_id: string;
};
const SubmissionDetailContainer: React.FC<PropsType> = ({
  submission_id,
}: PropsType) => {
  return (
    <div className="flex flex-col">
      <div>Submission: {submission_id} </div>
    </div>
  );
};

export default SubmissionDetailContainer;
