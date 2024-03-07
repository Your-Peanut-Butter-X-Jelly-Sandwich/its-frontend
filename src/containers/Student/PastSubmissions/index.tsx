"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Typography, List, Card, Row, Col } from "antd";
const { Title, Text } = Typography;

type PropsType = { qn_id: string };

const PastSubmissionsContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();
  const submissions = [
    { id: 1, title: "Submission 1" },
    { id: 2, title: "Submission 2" },
    { id: 3, title: "Submission 3" },
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
        <Link href={`/en/student/questions/${qn_id}`} passHref>
          <Button style={backButtonStyle}>Back to Question</Button>
        </Link>
      </div>
      <Title level={4}>
        Here you can see ALL past attempts for question <Text type="danger">{qn_id}</Text> and the corresponding reports.
      </Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={submissions}
        renderItem={(item, index) => (
          <List.Item>
            <Card style={cardStyle}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Text>Submission {index + 1}</Text>
                </Col>
                <Col>
                  <Link href={`${pathname}/${item.id}`} passHref>
                    <Button style={viewReportButtonStyle}>View Report</Button>
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

export default PastSubmissionsContainer;

