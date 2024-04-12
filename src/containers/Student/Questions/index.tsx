'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Typography, Card, Row, Col, Pagination, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useGetQuestionsQuery } from '@/redux/apis/student';

const { Title, Text } = Typography;

const QuestionsContainer: React.FC = () => {
  const pathname = usePathname();
  const pageSize = 7;
  const [page, setPage] = React.useState(1);

  const { data } = useGetQuestionsQuery({});
  const questions = data?.questions;

  const canAttempt = (dueDate: string) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const d1 = Date.parse(todayStr);
    const d2 = Date.parse(dueDate);
    return d1 < d2;
  };
  return (
    <div className="h-full p-5 bg-[#f0f2f5]">
      <Title level={2} className="mb-[1.5%]">
        Select the question you want to attempt!
      </Title>
      <div className="h-[92%] flex flex-col justify-between">
        <div>
          {questions
            ?.slice((page - 1) * pageSize, page * pageSize)
            .map((question: StudentQuestion) => (
              <Card key={question.pk} className="bg-[#ffffff] mb-5">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text className="text-[1.3rem]">{question.question_title}</Text>
                    {question.passed && (
                      <Tag className="ml-3" icon={<CheckCircleOutlined />} color="#87d068">
                        Passed
                      </Tag>
                    )}
                  </Col>
                  <Col>
                    <Link href={`${pathname}/${question.pk}/past-submissions`} passHref>
                      <Button
                        type="primary"
                        className="bg-blue-500 mr-3"
                        id={`${question.pk}`}
                        disabled={!question.attempted}
                      >
                        Past Submissions
                      </Button>
                    </Link>
                    <Link href={`${pathname}/${question.pk}`} passHref>
                      <Button
                        type="primary"
                        className="bg-green-500"
                        id={`${question.pk}`}
                        disabled={!canAttempt(question.due_date)}
                      >
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
            className="text-center"
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionsContainer;
