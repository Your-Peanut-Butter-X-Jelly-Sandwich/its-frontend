import { NextPage } from 'next';
import EditQuestionContainer from '@/containers/Tutor/EditQuestion';
type ParamsType = {
  params: {
    qn_id: string;
  };
};

const EditPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div className="h-full max-h-full">
      {/* @ts-ignore */}
      <EditQuestionContainer {...params} />
    </div>
  );
};

export default EditPage;
