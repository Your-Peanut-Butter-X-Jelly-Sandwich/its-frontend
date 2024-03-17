interface IQuestionDetailResponse {
  pk: number;
  question_title: string;
  question_statement: string;
  language: string;
  due_date: string;
  pub_date: string;
  pub_by: {
    email: string;
    organisation: string;
    username: string;
    is_student: boolean;
    is_tutor: boolean;
    is_manager: boolean;
  };
}

interface IQuestionDetailRequest {
  qn_id: number;
}

interface IQuestion {
  pk: number;
  question_title: string;
  due_date: string;
  pub_date: string;
  pub_by: {
    email: string;
    organisation: string;
    username: string;
    is_student: boolean;
    is_tutor: boolean;
    is_manager: boolean;
  };
}

interface IQuestionsResponse {
  questions: IQuestion[];
}

interface IQuestionsRequest {}

interface ISubmission {
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

interface IPastSubmissionsResponse {
  submissions: ISubmission[];
}

interface IPastSubmissionsRequest {
  qn_id: number;
}
