"use client";

import React from "react";
import Link from "next/link";
import { Row, Col, Card, Typography, Button } from 'antd';
import { useGetSubmissionDetailQuery } from '@/redux/apis/student/SubmissionDetail/submissionApi'; 
const { Title, Paragraph } = Typography;

type SubmissionDetailProps = {
  submission_id: string;
};

const SubmissionDetailContainer: React.FC<SubmissionDetailProps> = ({ submission_id }) => {
  // Styles
  const pageStyle = {
    padding: '20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  };

  const cardStyle = {
    minHeight: '100vh', 
    border: '1px solid #d9d9d9',
  };

  const backButtonStyle = {
    backgroundColor: '#1890ff',
    color: '#fff',
    borderColor: '#1890ff',
  };

  const reportContent = `
    This is a detailed report of the submission. It includes statistics, 
    analysis, and performance metrics that provide insight into the submission quality.
  `;

  const feedbackContent = `
    The tutor's feedback goes here. This includes constructive criticism, 
    areas for improvement, and commendations for what was done well in the submission.
  `;

  const numericSubmissionId = Number(submission_id);
  // const { data, error, isLoading } = useGetSubmissionDetailQuery(numericSubmissionId);


  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>An error occurred</div>;
  // if (!data) return <div>Submission not found</div>;
  // <Paragraph>{data.submission_report}</Paragraph> // Displaying the submission report

  return (
    <div style={pageStyle}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/en/student/questions/1/past-submissions" passHref>
          <Button style={backButtonStyle}>Back to Submissions</Button>
        </Link>
      </div>
      <Title level={4} style={{ marginTop: '20px' }}>
        Here you can see feedback given to you.
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Submission Report" bordered style={cardStyle}>
          <Paragraph> {reportContent} </Paragraph>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Tutor Feedback" bordered style={cardStyle}>
          <Paragraph> {feedbackContent} </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SubmissionDetailContainer;
