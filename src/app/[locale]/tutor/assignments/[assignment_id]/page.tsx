import { NextPage } from "next";
import AssignmentDetailContainer from "@/containers/Tutor/AssignmentDetail";

type ParamsType = {
  params: {
    assignment_id: string;
  };
};
const AssignmentPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div>
      <AssignmentDetailContainer assignment_id={params.assignment_id} />
    </div>
  );
};

export default AssignmentPage;
