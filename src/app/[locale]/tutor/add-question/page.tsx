import { NextPage } from 'next';
import AddQuestionContainer from '@/containers/Tutor/AddQuestion';
const AddQuestionPage: NextPage = () => {
  return (
    <div className="grow shrink">
      <AddQuestionContainer />
    </div>
  );
};

export default AddQuestionPage;
