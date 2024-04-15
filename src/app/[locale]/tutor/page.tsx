import type { NextPage } from 'next';
import TutorDashboardContainer from '@/containers/Tutor/Dashboard';
const TutorDashBoardPage: NextPage = () => {
  return (
    <div className="h-full max-h-full">
      <TutorDashboardContainer />
    </div>
  );
};

export default TutorDashBoardPage;
