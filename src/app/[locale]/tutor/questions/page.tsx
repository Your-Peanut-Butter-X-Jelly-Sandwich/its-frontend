import { NextPage } from 'next';
import QuestionsContainer from '@/containers/Tutor/Questions';

const QuestionsPage: NextPage = () => {
  return (
    <div className="h-full max-h-full">
      {/* @ts-ignore */}
      <QuestionsContainer />
    </div>
  );
};

export default QuestionsPage;
