"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Typography, List, Card, Row, Col, message } from "antd";
const { Title, Text } = Typography;

type QuestionType = {
  pk: number;
  question_title: string;
  pub_date: string;
  due_date: string;
};

type PropsType = { qn_id: string };

const QuestionsContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const baseUrl = "http://127.0.0.1:8000";
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNjc5NTcxLCJpYXQiOjE3MTA1OTMxNzEsImp0aSI6IjJlNGZjYjE5MDJjNzQxNDQ5OTU3YTg4Nzg0MTM4MGNmIiwidXNlcl9pZCI6MTF9.4YliXiwUPmhhAgTsNayaAET_0RXL7FWMK2pE4iiLJdk";

  const fetchQuestions = () => {
    fetch(`${baseUrl}/tutor/question`, {
      headers: {
        "Authorization": `Bearer ${authToken}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };

  const handleDeleteQuestion = (pk: number) => {
    fetch(`${baseUrl}/tutor/question/${pk}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    })
      .then(response => {
        if (response.ok) {
          setQuestions(prevQuestions => prevQuestions.filter(question => question.pk !== pk));
          message.success('Question deleted successfully');
        } else {
          message.error('Error deleting question');
        }
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
        message.error('Error deleting question');
      });
  };

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

  const deleteButtonStyle = {
    backgroundColor: '#ff4d4f', 
    color: '#fff', 
    borderColor: '#ff4d4f',
    marginLeft: '10px', 
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
        renderItem={(item) => (
          <List.Item>
            <Card style={cardStyle}>
              <Row justify="space-between" align="middle">
                <Col span={12}>
                  <Text strong>{item.question_title}</Text>
                  <br />
                  <Text>Published: {item.pub_date}</Text>
                  <br />
                  <Text>Due by: {item.due_date}</Text>
                </Col>
                <Col>
                  <Link href={`${pathname}/${item.pk}`} passHref>
                    <Button style={viewReportButtonStyle}>View Question Insight</Button>
                  </Link>
                  <Button 
                    style={deleteButtonStyle} 
                    onClick={() => handleDeleteQuestion(item.pk)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default QuestionsContainer
