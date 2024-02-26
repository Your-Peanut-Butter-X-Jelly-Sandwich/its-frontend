import React from "react";

type PropsType = {
  qn_id: string;
};
const SubmissionsContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  return (
    <div>This page shows a list of all submissions for question {qn_id}</div>
  );
};

export default SubmissionsContainer;
