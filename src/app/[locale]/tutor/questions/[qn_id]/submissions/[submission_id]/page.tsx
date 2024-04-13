import { NextPage } from 'next';
import SubmissionDetailContainer from '@/containers/Tutor/SubmissionDetail';

const SubmissionDetailPage: NextPage<ITutorSubmissionRequestParam> = ({ params }: ITutorSubmissionRequestParam) => {
  return (
    <div className="grow shrink">
      {/* @ts-ignore */}
      <SubmissionDetailContainer {...params} />
    </div>
  );
};

export default SubmissionDetailPage;
