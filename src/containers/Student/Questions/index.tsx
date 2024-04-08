'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Typography, Card, Row, Col, Pagination } from 'antd';
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

const QuestionsContainer: React.FC = () => {
  const pathname = usePathname();
  const pageSize = 7;
  const [page, setPage] = React.useState(1);

  const { data } = useGetQuestionsQuery({});
  const questions = data?.questions;

  return (
    <div style={PAGE}>
      <Title level={2} style={{ marginBottom: '1.5%' }}>
        Select the question you want to attempt!
      </Title>
      <div className="h-[92%] flex flex-col justify-between">
        <div>
          {questions
            ?.slice((page - 1) * pageSize, page * pageSize)
            .map((question: IStudentQuestion) => (
              <Card style={CARD} key={question.pk}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text style={{ fontSize: '1.3rem' }}>{question.question_title}</Text>
                  </Col>
                  <Col>
                    <Link href={`${pathname}/${question.pk}/past-submissions`} passHref>
                      <Button type="primary" className="bg-blue-500 mr-3" id={`${question.pk}`}>
                        Submissions
                      </Button>
                    </Link>
                    <Link href={`${pathname}/${question.pk}`} passHref>
                      <Button type="primary" className="bg-blue-500" id={`${question.pk}`}>
                        Attempt
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card>
            ))}
        </div>
        <div>
          <Pagination
            defaultCurrent={1}
            total={questions?.length}
            pageSize={pageSize}
            style={{ textAlign: 'center' }}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionsContainer;
