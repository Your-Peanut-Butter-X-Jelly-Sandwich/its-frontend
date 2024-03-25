interface ISTutorQuestionStatisticsResponse {
  total_students: number;
  passes: number;
  total_submissions: number;
}

interface ISTutorQuestionDetailRequest {
  qn_id: number;
}

interface ISTutorQuestionDetailResponse {
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

interface ISTutorTestCaseResponse {
  pk: number;
  input: string;
  output: string;
}

interface ISTutorQuestionContent {
  test_cases: Array<{ pk: number; input: string; output: string }>;
  question_title: string;
  question_statement: string;
  ref_program: string;
  language: 'python' | 'c';
  due_date: string;
}

interface ISTutorSubmissionResponse {
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

interface ISTutorSubmission {
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

interface ISTutorSubmissionRequest {
  qn_id: number;
  submission_id: number;
}
