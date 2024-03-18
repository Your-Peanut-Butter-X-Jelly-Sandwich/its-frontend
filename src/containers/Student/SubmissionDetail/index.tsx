'use client';

import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { useGetSubmissionDetailQuery } from '@/redux/apis/student/SubmissionDetail';
import { Editor } from '@monaco-editor/react';

const { Paragraph } = Typography;

const PAGE = {
  padding: '20px',
  backgroundColor: '#f0f2f5',
  minHeight: '100vh',
};

const CARD = {
  minHeight: '95vh',
  border: '1px solid #d9d9d9',
};

type SubmissionDetailProps = {
  submission_id: string;
};

const SubmissionDetailContainer: React.FC<SubmissionDetailProps> = ({ submission_id }) => {
  const { data } = useGetSubmissionDetailQuery({
    id: Number(submission_id),
  });

  return (
    <div style={PAGE}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Submission Program" bordered style={CARD}>
            <Editor
              height="80vh"
              language="python"
              theme="vs-light"
              value={data?.program}
              options={{
                readOnly: true,
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Tutor Feedback" bordered style={CARD}>
            <Paragraph> {data?.tutor_feedback} </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SubmissionDetailContainer;
