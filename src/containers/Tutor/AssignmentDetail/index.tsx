import React from "react";

type PropsType = {
  assignment_id: string;
};
const AssignmentDetailContainer: React.FC<PropsType> = ({
  assignment_id,
}: PropsType) => {
  return (
    <div>
      This page contains all the questions under assignment {assignment_id}
    </div>
  );
};

export default AssignmentDetailContainer;
