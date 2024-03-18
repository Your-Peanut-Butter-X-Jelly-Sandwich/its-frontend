interface QuestionStatistics  {
    total_students: number;
    passes: number;
    total_submissions: number;
}

interface PropsType  {
    qn_id: string;
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

