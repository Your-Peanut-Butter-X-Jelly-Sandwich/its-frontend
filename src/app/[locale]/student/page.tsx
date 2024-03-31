import type { NextPage } from 'next';
import StudentDashboardContainer from '@/containers/Student/Dashboard';
const StudentDashboardPage: NextPage = () => {
  return (
    <div className="h-full max-h-full">
      <StudentDashboardContainer />
    </div>
  );
};

export default StudentDashboardPage;
