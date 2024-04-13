'use client';

import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { useGetSubmissionDetailQuery, useGetQuestionDetailQuery } from '@/redux/apis/student';
import { Editor } from '@monaco-editor/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ButtonBack from '@/components/ButtonBack';
const { Paragraph } = Typography;

type SubmissionDetailProps = {
  submission_id: string;
};

const SubmissionDetailContainer: React.FC<SubmissionDetailProps> = ({ submission_id }) => {
  const pathname = usePathname();
  const questionDetailPathname = pathname.split('/').slice(0, 5).join('/');
  const questionId = pathname.split('/')[4];
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const { data: questionData } = useGetQuestionDetailQuery({ qn_id: Number(questionId) });

  React.useEffect(() => {
    if (questionData) {
      setDisabled(
        Date.parse(questionData.due_date) < Date.parse(new Date().toISOString().split('T')[0])
      );
    }
  }, [questionData]);

  const [editor, setEditor] = React.useState<any>();
  const [monaco, setMonaco] = React.useState<any>();
  const [hints, sethints] = React.useState<any>([]);

  const { data } = useGetSubmissionDetailQuery({
    id: Number(submission_id),
  });

  React.useEffect(() => {
    if (data) {
      console.log(data);
      sethints(data.its_feedback_hint_student);
    }
  }, [data]);

  React.useEffect(() => {
    if (editor && monaco && hints) {
      const markers: any = [];
      hints?.hints?.map((hint: any) => {
        markers.push({
          startLineNumber: hint.lineNumber,
          startColumn: editor.getModel().getLineFirstNonWhitespaceColumn(hint.lineNumber),
          endLineNumber: hint.lineNumber,
          endColumn: editor.getModel().getLineLength(hint.lineNumber) + 1,
          message: hint.hintStrings ? hint.hintStrings[0] : 'no hint available',
          severity: monaco.MarkerSeverity.Error,
        });
      });
      monaco.editor.setModelMarkers(editor.getModel(), 'owner', markers);
    }
  }, [editor, monaco, hints]);

  return (
    <div className="h-full flex flex-col gap-5 p-5 bg-[#f0f2f5]">
      <ButtonBack>All Past Submissions</ButtonBack>
      <div className="flex-1 min-h-0">
        <Row gutter={[24, 24]} className="max-h-full h-full">
          <Col xs={24} lg={12} className="max-h-full h-full">
            <Card
              title="Submitted Program"
              bordered
              className="flex flex-col max-h-full h-full border-solid border-[1px] border-[#d9d9d9]"
              classNames={{ body: 'min-h-0 max-h-full grow flex flex-col' }}
            >
              <Editor
                width={'100%'}
                defaultLanguage={data?.language}
                value={data?.program}
                onMount={(editor, monaco) => {
                  setEditor(editor);
                  setMonaco(monaco);
                }}
                className="flex-1"
              />
              <div className="basis-1/5">
                <h1 className="font-bold">Hints:</h1>
                {hints?.hints?.length === 0 && <p>No hints available</p>}
                <ul>
                  {hints?.hints?.map((hint: any) => (
                    <li key={hint.lineNumber}>
                      <p>
                        - <span className="text-red-400">Line {hint.lineNumber}</span>:{' '}
                        {hint.hintStrings ? hint.hintStrings[0] : 'no hint available'}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12} className="min-h-0">
            <Card
              title="Tutor Feedback"
              bordered
              className="h-full border-solid border-[1px] border-[#d9d9d9] min-h-0"
            >
              <Paragraph> {data?.tutor_feedback} </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="flex justify-center items-center mt-3">
        <Link href={`${questionDetailPathname}?submission_id=${submission_id}`} passHref>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={disabled}
          >
            Edit and resubmit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SubmissionDetailContainer;
