'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Typography, Card, Row, Col } from 'antd';
import { useGetQuestionsQuery } from '@/redux/apis/student';

const { Title, Text } = Typography;

const PAGE = {
  padding: '20px',
  backgroundColor: '#f0f2f5',
  height: '100%',
};

const CARD = {
  backgroundColor: '#ffffff',
  marginBottom: '20px',
};

const ATTEMPT_BUTTON = {
  backgroundColor: '#1890ff',
  color: '#fff',
  borderColor: '#1890ff',
};

const QuestionsContainer: React.FC = () => {
  const pathname = usePathname();

  const { data } = useGetQuestionsQuery({});
  const questions = data?.questions;

  return (
    <div style={PAGE}>
      <Title level={2} style={{ marginBottom: '1.5%' }}>
        Select the question you want to attempt!
      </Title>
      {questions?.map((question: IStudentQuestion) => (
        <Card style={CARD} key={question.pk}>
          <Row justify="space-between" align="middle">
            <Col>
              <Text style={{ fontSize: '1.3rem' }}>{question.question_title}</Text>
            </Col>
            <Col>
              <Link href={`${pathname}/${question.pk}`} passHref>
                <Button style={ATTEMPT_BUTTON} id={`${question.pk}`}>
                  Attempt
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default QuestionsContainer;
