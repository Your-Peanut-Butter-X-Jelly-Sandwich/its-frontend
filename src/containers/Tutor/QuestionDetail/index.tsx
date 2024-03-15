"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button, Row, Col, Statistic, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Link from 'next/link'; 

type PropsType = {
  qn_id: string;
};

const QuestionDetailContainer: React.FC<PropsType> = ({ qn_id }) => {
  const pathname = usePathname();

  const cardStyle = {
    padding: '24px',
    textAlign: 'center',
  };

  const backButtonStyle = {
    backgroundColor: '#1890ff',
    color: '#fff',
    borderColor: '#1890ff',
    marginBottom: '20px', 
  };

  const statistics = {
    numberOfSubmissions: 120,
    passRate: 75,
    averageScore: 85,
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/en/tutor/questions`} passHref>
          <Button style={backButtonStyle}>Back to Question List</Button>
        </Link>
      </div>
      <div className="text-2xl" style={{ marginBottom: '24px' }}>
        You are viewing <strong>QUESTION: {qn_id}</strong>
      </div>
      <Row gutter={[16, 16]} justify="space-around">
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Number of Submissions"
              value={statistics.numberOfSubmissions}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Pass Rate"
              value={statistics.passRate}
              precision={2}
              suffix="%"
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Average Score"
              value={statistics.averageScore}
              precision={2}
              valueStyle={{ color: '#234abc' }} 
            />
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Button type="primary" href={`${pathname}/submissions`}>
          View Student Submissions
        </Button>
      </div>
    </div>
  );
};

export default QuestionDetailContainer;
