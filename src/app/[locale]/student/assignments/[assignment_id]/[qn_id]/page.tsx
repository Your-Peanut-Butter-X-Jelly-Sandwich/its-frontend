import type { NextPage } from "next";
import QuestionDetailContainer from "@/containers/Student/QuestionDetail";
type ParamsType = {
  params: {
    assignment_id: string;
    qn_id: string;
  };
};

const QuestionPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div>
      <QuestionDetailContainer assignment_id={params.assignment_id} qn_id={params.qn_id} />
    </div>
  );
};
export default QuestionPage;
