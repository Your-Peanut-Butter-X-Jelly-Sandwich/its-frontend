"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Typography, List, Card, Row, Col } from "antd";
const { Title, Text } = Typography;

type PropsType = { qn_id: string };

const QuestionsContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();
  const questions = [
    { id: 1, title: "Question 1" },
    { id: 2, title: "Question 2" },
    { id: 3, title: "Question 3" },
  ];

  const pageStyle = {
    padding: '20px',
    backgroundColor: '#f0f2f5', 
    minHeight: '100vh',
  };

  const cardStyle = {
    backgroundColor: '#ffffff', 
  };

  const viewReportButtonStyle = {
    backgroundColor: '#1890ff', 
    color: '#fff', 
    borderColor: '#1890ff', 
  };

  const backButtonStyle = {
    backgroundColor: '#1890ff', 
    color: '#fff', 
    borderColor: '#1890ff', 
  };

  return (
    <div style={pageStyle}>
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/en/tutor`} passHref>
          <Button style={backButtonStyle}>Back to Dashboard</Button>
        </Link>
      </div>
      <Title level={4}>
        Here you can see ALL questions.
      </Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={questions}
        renderItem={(item, index) => (
          <List.Item>
            <Card style={cardStyle}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Text>Question {index + 1}</Text>
                </Col>
                <Col>
                  <Link href={`${pathname}/${item.id}`} passHref>
                    <Button style={viewReportButtonStyle}>View Question Insight</Button>
                  </Link>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuestionsContainer;

