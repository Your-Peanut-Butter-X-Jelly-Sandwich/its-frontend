import { NextPage } from 'next';
import QuestionDetailContainer from '@/containers/Tutor/QuestionDetail';

type ParamsType = {
  params: {
    qn_id: string;
  };
};
const QuestionPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div>
      {/* @ts-ignore */}
      <QuestionDetailContainer {...params} />
    </div>
  );
};

export default QuestionPage;
