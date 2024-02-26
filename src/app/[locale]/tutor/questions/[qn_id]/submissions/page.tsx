import { NextPage } from "next";
import SubmissionsContainer from "@/containers/Tutor/Submissions";
type ParamsType = {
  params: {
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
