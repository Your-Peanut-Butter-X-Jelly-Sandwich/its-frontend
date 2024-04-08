interface ITutorQuestionStatisticsResponse {
  total_students: number;
  passes: number;
  total_submissions: number;
}

interface ITutorQuestionDetailRequest {
  qn_id: number;
}

interface ITutorQuestionDetailResponse {
  question: {
    id: string;
    test_cases: Array<ITutorTestCaseResponse>;
    question_title: string;
    question_statement: string;
    ref_program: string;
    language: 'python' | 'c';
    pub_date: string;
    due_date: string;
  };
  total_students: number;
  passes: number;
  total_submissions: number;
}

interface ITutorTestCaseResponse {
  pk: number;
  input: string;
  output: string;
}

interface ITutorTestCase {
  input: string;
  output: string;
}

interface ITutorQuestionContent {
  test_cases: Array<{ pk: number; input: string; expectedOutput: string }>;
  question_title: string;
  question_statement: string;
  ref_program: string;
  language: 'python' | 'c';
  due_date: string;
}

interface ITutorSubmissionResponse {
  pk: number;
  submission_number: number;
  submitted_by: {
    email: string;
    organisation: string;
    username: string;
    is_student: boolean;
    is_tutor: boolean;
    is_manager: boolean;
  };
  score: number;
  total_score: number;
  submission_date: string;
}

interface ITutorSubmission {
  pk: number;
  qn_id: string;
  submission_number: number;
  language: 'python' | 'c';
  submission_date: string;
  program: string;
  its_feedback_fix_tutor: string;
  tutor_feedback: string;
  status: string;
  total_score: number;
  score: number;
}

interface ITutorSubmissionRequest {
  qn_id: number;
  submission_id: number;
}

interface ITutorGetQuestionResponse {
  pk: number;
  question_title: string;
  pub_date: string;
  due_date: string;
}

interface ITutorQuestionsResponse {
  questions: ITutorGetQuestionResponse[];
}

interface ITutorDashboardStatsResponse {
  personal_info: IUser;
  students: IUser[];
  questions_due_in_a_month: ITutorGetQuestionResponse[];
  questions_due_in_a_week: ITutorGetQuestionResponse[];
}

interface ITutorCodeEditorProps {
  language: string;
  codeContent: string;
  handleCodeEditorChange: (value: string) => void;
}

interface ITutorMdEditorProps {
  currentLeftTab: 'preview' | 'edit';
  setCurrentLeftTab: (value: string) => void;
  markdown: string;
  handleEditorChange: (value: string) => void;
}

interface ITutorTestCaseProps {
  testCases: ITutorTestCaseResponse[];
  updateTestCase: (index: number, field: string, value: string) => void;
  addTestCase: () => void;
  removeLastTestCase: () => void;
}
