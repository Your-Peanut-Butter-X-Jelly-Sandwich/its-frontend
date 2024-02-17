import React from "react";

type PropsType = {
  assignment_id: string;
  qn_id: string;
};

const PastSubmissionsContainer: React.FC<PropsType> = ({
  assignment_id,
  qn_id,
}: PropsType) => {
  return (
    <div>
      Here you can see all past attempts for question{" "}
      <strong className="text-red-600">{qn_id}</strong> under assignment{" "}
      <strong className="text-red-600">{assignment_id}</strong> and the
      corresponding reports.
    </div>
  );
};

export default PastSubmissionsContainer;
