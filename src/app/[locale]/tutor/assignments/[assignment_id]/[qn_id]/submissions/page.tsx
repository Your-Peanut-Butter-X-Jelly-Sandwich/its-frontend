import { NextPage } from "next";
import SubmissionsContainer from "@/containers/Tutor/Submissions";
type ParamsType = {
  params: {
    assignment_id: string;
    qn_id: string;
  };
};

const SubmissionsPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div>
      <SubmissionsContainer {...params} />
    </div>
  );
};

export default SubmissionsPage;
