import { NextPage } from "next";
import SubmissionDetailContainer from "@/containers/Tutor/SubmissionDetail";
type ParamsType = {
  params: {
    assignment_id: string;
    qn_id: string;
    submission_id: string;
  };
};
const SubmissionDetailPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div>
      <SubmissionDetailContainer {...params} />
    </div>
  );
};

export default SubmissionDetailPage;
