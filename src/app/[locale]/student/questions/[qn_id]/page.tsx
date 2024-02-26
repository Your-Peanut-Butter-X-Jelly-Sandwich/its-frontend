import type { NextPage } from "next";
import QuestionDetailContainer from "@/containers/Student/QuestionDetail";
type ParamsType = {
  params: {
    qn_id: string;
  };
};

const QuestionPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div>
      <QuestionDetailContainer qn_id={params.qn_id} />
    </div>
  );
};
export default QuestionPage;
