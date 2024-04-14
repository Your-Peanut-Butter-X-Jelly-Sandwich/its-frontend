import { NextPage } from 'next';
import AddQuestionContainer from '@/containers/Tutor/AddQuestion';
const AddQuestionPage: NextPage = () => {
  return (
    <div className="h-full max-h-full">
      <AddQuestionContainer />
    </div>
  );
};

export default AddQuestionPage;
