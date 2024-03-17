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
  questionId: number;
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
