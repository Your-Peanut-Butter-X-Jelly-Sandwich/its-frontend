interface QuestionStatistics  {
    total_students: number;
    passes: number;
    total_submissions: number;
}

interface PropsType  {
    qn_id: number;
};
  
interface QuestionData {
    question: {
        id: number;
        test_cases: Array<{ pk: number; input: string; output: string }>;
        question_title: string;
        question_statement: string;
        ref_program: string;
        language: "python"|"c";
        pub_date: string;
        due_date: string;
    };
    total_students: number;
    passes: number;
    total_submissions: number;
};
  
interface TestCaseType {
    pk: number;
    input: string;
    output: string;
};

interface QuestionContent {
    test_cases: Array<{ pk: number; input: string; output: string }>;
    question_title: string;
    question_statement: string;
    ref_program: string;
    language: "python"|"c";
    due_date: string;
};

interface SubmissionType {
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
};


interface SubmissionDetail {
    pk: number;
    qn_id: number;
    submission_number: number;
    language: "python"|"c";
    submission_date: string;
    program: string;
    its_feedback_fix_tutor: string;
    tutor_feedback: string;
    status: string;
    total_score: number;
    score: number;
}

interface SubmissionDataType {
    qn_id: number;
    submission_id: number;
  };