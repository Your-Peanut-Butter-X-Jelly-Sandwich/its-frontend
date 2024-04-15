import type { NextPage } from 'next';
import PastSubmissionsContainer from '@/containers/Student/PastSubmissions';
type ParamsType = {
  params: {
    qn_id: string;
  };
};
const PastSubmissionsPage: NextPage<ParamsType> = ({ params }: ParamsType) => {
  return (
    <div className="h-full">
      <PastSubmissionsContainer qn_id={params.qn_id} />
    </div>
  );
};
export default PastSubmissionsPage;
