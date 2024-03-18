"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/slices/auth'; 
import { Button, Typography, List, Card, Row, Col, message } from "antd";
import { useGetQuestionsQuery, useLazyGetQuestionsQuery, useDeleteQuestionMutation } from '@/redux/apis/tutor/Questions';


const { Title, Text } = Typography;

const QuestionsContainer:React.FC<PropsType> = ({ qn_id }) => {
  const pathname = usePathname();
  // const { data: questions, error, isLoading } = useGetQuestionsQuery();
  const [questionList, setQuestionList] = useState();
  const [getQuestions] = useLazyGetQuestionsQuery();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const fetchQuestionList = async () => {
    const result = await getQuestions().unwrap();
    setQuestionList(result.questions);
  }

  useEffect(() => {
    fetchQuestionList();
  }, [])
  // useEffect(() => {
  //   if (error) {
  //     message.error('Error fetching questions');
  //   }
  // }, [error]);
  const handleDeleteQuestion = async (pk:any) => {
    try {
      await deleteQuestion(pk).unwrap();
      message.success('Question deleted successfully');
      fetchQuestionList();

    } catch (err) {
      message.error('Error deleting question');
    }
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
        <Button style={ backButtonStyle }>Back to Dashboard</Button>
      </Link>
    </div>
    <Title level={4}>Here you can see ALL questions.</Title>
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={questionList}
      renderItem={(item: any) => (
        <List.Item>
          <Card style={cardStyle} >
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
                  <Button style={viewReportButtonStyle} >View Question Insight</Button>
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
};

export default QuestionsContainer;

