import { NextPage } from 'next';
import QuestionsContainer from '@/containers/Tutor/Questions';

const QuestionsPage: NextPage = () => {
  return (
    <div>
      {/* @ts-ignore */}
      <QuestionsContainer />
    </div>
  );
};

export default QuestionsPage;
