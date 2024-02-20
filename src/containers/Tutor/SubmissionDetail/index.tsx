import React from "react";

type PropsType = {
  assignment_id: string;
  qn_id: string;
  submission_id: string;
};
const SubmissionDetailContainer: React.FC<PropsType> = ({
  assignment_id,
  qn_id,
  submission_id,
}: PropsType) => {
  return (
    <div>
      <div>
        Submission {submission_id} for Assignment {assignment_id} Question{" "}
        {qn_id}
      </div>
      <div className="flex h-screen gap-5">
        <div className="basis-1/2 bg-slate-400">
          <span>LEFT: Code editor showing student submitted program</span>
        </div>
        <div className="basis-1/2 bg-violet-300">
          <span>RIGHT: Text Editor for tutor to provide feedback</span>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailContainer;
