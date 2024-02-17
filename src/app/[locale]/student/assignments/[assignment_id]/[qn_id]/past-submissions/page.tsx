import type { NextPage } from "next";
import PastSubmissionsContainer from "@/containers/Student/PastSubmissions";
type ParamsType = {
  params: {
    assignment_id: string;
    qn_id: string;
  };
};
const PastSubmissionsPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div>
      <PastSubmissionsContainer
        assignment_id={params.assignment_id}
        qn_id={params.qn_id}
      />
    </div>
  );
};
export default PastSubmissionsPage;
