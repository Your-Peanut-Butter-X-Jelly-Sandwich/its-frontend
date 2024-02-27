"use client";
import React from "react";
import { Row, Col, Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

type SubmissionDetailProps = {
  submission_id: string;
};

const SubmissionDetailContainer: React.FC<SubmissionDetailProps> = ({ submission_id }) => {
  // Dummy data for report and feedback
  const reportContent = `
    This is a detailed report of the submission. It includes statistics, 
    analysis, and performance metrics that provide insight into the submission quality.\n
  `;

  const feedbackContent = `
    The tutor's feedback goes here. This includes constructive criticism, 
    areas for improvement, and commendations for what was done well in the submission.
  `;

  return (
    <Row gutter={24}>
      <Col xs={24} md={12}>
        <Card title="Submission Report" bordered={false}>
          <Paragraph>{reportContent}</Paragraph>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card title="Tutor Feedback" bordered={false}>
          <Paragraph>{feedbackContent}</Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default SubmissionDetailContainer;
