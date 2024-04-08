interface IStudentQuestionDetailResponse {
  pk: number;
  question_title: string;
  question_statement: string;
  language: string;
  due_date: string;
  pub_date: string;
  pub_by: IUser;
}

interface IStudentQuestionDetailRequest {
  qn_id: number;
}

interface IStudentQuestion {
  pk: number;
  question_title: string;
  due_date: string;
  pub_date: string;
  pub_by: IUser;
  attempted: boolean;
  passed: boolean;
}

interface IStudentQuestionsResponse {
  questions: IStudentQuestion[];
}

interface IStudentQuestionsRequest {}

interface IStudentSubmission {
  pk: number;
  submission_number: number;
  score: number;
  total_score: number;
  submission_date: string;
  submitted_by: {
    email: string;
    organisation: string;
    username: string;
    is_student: boolean;
    is_tutor: boolean;
    is_manager: boolean;
  };
}

interface IStudentPastSubmissionsResponse {
  submissions: IStudentSubmission[];
}

interface IStudentPastSubmissionsRequest {
  qn_id: number;
}

interface IStudentSubmissionDetailResponse {
  id: number;
  qn_id: number;
  language: string;
  submission_number: number;
  submission_date: string;
  submitted_by: number;
  program: string;
  report: string;
  score: number;
  total_score: number;
  tutor_feedback: string;
  its_feedback_hint_student: string;
}

interface IStudentSubmissionDetailRequest {
  id: number;
}

interface IStudentCodeSubmissionResponse {
  pk: number;
  qn_id: number;
  submission_number: number;
  language: string;
  submission_date: string;
  program: string;
  its_feedback_hint_student: {
    message: string;
  };
  its_feedback_fix_tutor: {
    message: string;
  };
  tutor_feedback: string;
  report: string;
  score: number;
  total_score: number;
  submitted_by: IUser;
}

interface IStudentCodeSubmissionRequest {
  qn_id: number;
  language: string;
  program: string;
}

interface IStudentDashboardStatsResponse {
  personal_info: IUser;
  tutors: IUser[];
  total_question_assigned: number;
  attempted_questions: number;
  questions_due_in_a_month: IStudentQuestion[];
  questions_due_in_a_week: IStudentQuestion[];
}
