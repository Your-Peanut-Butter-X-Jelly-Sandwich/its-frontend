import { NextPage } from "next";
import SubmissionDetailContainer from "@/containers/Student/SubmissionDetail";
type ParamsType = {
  params: {
    assignment_id: string;
    qn_id: string;
    submission_id: string;
  };
};
const PastSubmissionDetailPage: NextPage<ParamsType> = ({
  params,
}: ParamsType) => {
  console.log(params);
  return (
    <div>
      <SubmissionDetailContainer submission_id={params.submission_id} />
    </div>
  );
};

export default PastSubmissionDetailPage;
