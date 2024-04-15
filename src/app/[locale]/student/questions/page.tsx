import type { NextPage } from 'next';
import QuestionsContainer from '@/containers/Student/Questions';
const QuestionsPage: NextPage = () => {
  return (
    <div className="h-full">
      <QuestionsContainer />
    </div>
  );
};

export default QuestionsPage;
