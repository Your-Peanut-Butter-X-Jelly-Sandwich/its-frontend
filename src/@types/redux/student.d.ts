interface StudentQuestionDetailResponse {
  pk: number;
  question_title: string;
  question_statement: string;
  language: string;
  due_date: string;
  pub_date: string;
  pub_by: IUser;
}

interface StudentQuestionDetailRequest {
  qn_id: number;
}

interface StudentQuestion {
  pk: number;
  question_title: string;
  due_date: string;
  pub_date: string;
  pub_by: IUser;
  attempted: boolean;
  passed: boolean;
}

interface StudentQuestionsResponse {
  questions: StudentQuestion[];
}

interface StudentQuestionsRequest {}

interface StudentSubmission {
  pk: number;
  status: string;
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

interface StudentPastSubmissionsResponse {
  submissions: StudentSubmission[];
}

interface StudentPastSubmissionsRequest {
  qn_id: number;
}

interface StudentSubmissionDetailResponse {
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

interface StudentSubmissionDetailRequest {
  id: number;
}

interface StudentCodeSubmissionResponse {
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

interface StudentCodeSubmissionRequest {
  qn_id: number;
  language: string;
  program: string;
}

interface StudentDashboardStatsResponse {
  personal_info: IUser;
  tutors: IUser[];
  total_question_assigned: number;
  attempted_questions: number;
  questions_due_in_a_month: StudentQuestion[];
  questions_due_in_a_week: StudentQuestion[];
}
