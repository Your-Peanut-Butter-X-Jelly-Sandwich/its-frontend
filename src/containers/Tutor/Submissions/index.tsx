import React from "react";

type PropsType = {
  assignment_id: string;
  qn_id: string;
};
const SubmissionsContainer: React.FC<PropsType> = ({
  assignment_id,
  qn_id,
}: PropsType) => {
  return (
    <div>
      This page shows a list of all submissions for assignment {assignment_id}{" "}
      question {qn_id}
    </div>
  );
};

export default SubmissionsContainer;
