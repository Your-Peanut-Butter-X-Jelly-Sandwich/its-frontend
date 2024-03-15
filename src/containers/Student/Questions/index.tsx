"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Typography, Card, Row, Col } from "antd";
const { Title, Text } = Typography;
import getLocale from "@/common/utils/extractLocale";

const QuestionsContainer: React.FC = () => {
  const pathname = usePathname();

  const pageStyle = {
    padding: '20px',
    backgroundColor: '#f0f2f5', 
    minHeight: '100vh',
  };

  const backButtonStyle = {
    backgroundColor: '#1890ff', 
    color: '#fff', 
    borderColor: '#1890ff', 
    marginBottom: '20px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff', 
    marginBottom: '20px',
  };

  const attemptButtonStyle = {
    backgroundColor: '#1890ff', 
    color: '#fff', 
    borderColor: '#1890ff'
  }

  const locale = getLocale(pathname);

  return (
    <div style={pageStyle}>
      <Button style={backButtonStyle}>
        <Link href={`${locale}/student`} passHref>Back to Student Dashboard</Link>
      </Button>
      <Title level={4}>Select the question you want to attempt</Title>
      <Card style={cardStyle}>
        <Row justify="space-between" align="middle">
          <Col>
            <Text>Question 1</Text>
          </Col>
          <Col>
            <Link href={`${pathname}/1`} passHref>
              <Button style = {attemptButtonStyle}>Attempt</Button>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card style={cardStyle}>
        <Row justify="space-between" align="middle">
          <Col>
            <Text>Question 2</Text>
          </Col>
          <Col>
            <Link href={`${pathname}/2`} passHref>
              <Button style = {attemptButtonStyle}>Attempt</Button>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card style={cardStyle}>
        <Row justify="space-between" align="middle">
          <Col>
            <Text>Question 3</Text>
          </Col>
          <Col>
            <Link href={`${pathname}/3`} passHref>
              <Button style = {attemptButtonStyle}>Attempt</Button>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card style={cardStyle}>
        <Row justify="space-between" align="middle">
          <Col>
            <Text>Question 4</Text>
          </Col>
          <Col>
            <Link href={`${pathname}/4`} passHref>
              <Button style = {attemptButtonStyle}>Attempt</Button>
            </Link>
          </Col>
        </Row>
      </Card>
      <Card style={cardStyle}>
        <Row justify="space-between" align="middle">
          <Col>
            <Text>Question 5</Text>
          </Col>
          <Col>
            <Link href={`${pathname}/5`} passHref>
              <Button style = {attemptButtonStyle}>Attempt</Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default QuestionsContainer;
