"use client";

import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import { Button } from "antd";
import { useGetQuestionDetailQuery } from "@/redux/apis/student/QuestionDetail";

type PropsType = {
  qn_id: string;
};

const QuestionDetailContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();
  const [code, setCode] = React.useState<string | undefined>("");
  const { data } = useGetQuestionDetailQuery({ qn_id: Number(qn_id) });

  return (
    <div className="flex bg-gray-100 h-full">
      <div className="w-[50%] p-10">
        {/* Problem Statement */}
        <div className="h-[80vh] overflow-auto">
          <Markdown>{data?.question_statement}</Markdown>
        </div>
      </div>
      {/* Code Editor */}
      <div className="w-[50%] bg-gray-400">
        <Button type="link" className="text-black">
          <Link href={`${pathname}/past-submissions`}>Submissions</Link>
        </Button>
        <Editor
          height="85vh"
          defaultLanguage="python"
          value={code}
          onChange={(newValue, e) => setCode(newValue)}
        />
        <div className="w-full flex justify-center items-center">
          <Button type="primary" className="ml-2 mt-2.5 bg-blue-500">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default QuestionDetailContainer;
