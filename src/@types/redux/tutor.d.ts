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
    test_cases: Array<{ pk: number; input: string; output: string }>;
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

interface ITutorQuestionContent {
  test_cases: Array<{ pk: number; input: string; output: string }>;
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
