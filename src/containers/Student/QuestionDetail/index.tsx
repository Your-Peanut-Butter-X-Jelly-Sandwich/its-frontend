"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Editor from "@monaco-editor/react";
import { Viewer, Worker } from '@react-pdf-viewer/core';

type PropsType = {
  assignment_id: string;
  qn_id: string;
};

const QuestionDetailContainer: React.FC<PropsType> = ({
  assignment_id,
  qn_id,
}: PropsType) => {
  const pathname = usePathname();
  const [code, setCode] = React.useState<string|undefined>("// some code");

  return (
    <div className="flex">
      <div className="w-[50%]">
        <button className="bg-green-400 text-white p-2 rounded-lg">
          <Link href={`${pathname}/past-submissions`}>
            See Past Submissions
          </Link>
        </button>
        {/* Problem Statement */}
        <Worker
          workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
        >
          <div style={{ height: '750px' }}>
            <Viewer fileUrl="./test.pdf" />
          </div>
        </Worker>
      </div>
      {/* Code Editor */}
      <div className="w-[50%]">
        <Editor height="90vh" defaultLanguage="c" value={code} onChange={(newValue, e) => setCode(newValue)}/>
        <div className="h-[5vh] w-full flex justify-center mt-1">
          <button className="bg-green-400 text-white p-2 rounded-lg">Submit</button>
        </div>
      </div>
    </div>
  );
};
export default QuestionDetailContainer;
