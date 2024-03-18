"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button, Row, Col, Statistic, Card } from 'antd';
import { useLazyGetQuestionDetailQuery } from "@/redux/apis/tutor/QuestionDetail";
import Link from 'next/link';
import { useEffect, useState } from "react";
const QuestionDetailContainer: React.FC<PropsType> = ({ qn_id }) => {
  const pathname = usePathname();
  const [getQuestionDetail ] = useLazyGetQuestionDetailQuery();

  const [questionDetail, setQuestionDetail] = useState<QuestionData|undefined>(undefined);

  const fetchQuestionDetail = async () => {
    const result: QuestionData = await getQuestionDetail({qn_id}).unwrap() as QuestionData;
    setQuestionDetail(result);
  }
  useEffect(() => {
    fetchQuestionDetail();
  }, [])

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
          <Card style={{ padding: '24px', textAlign: 'center' }}>
            <Statistic
              title="Total Students"
              value={questionDetail?.total_students}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card style={{ padding: '24px', textAlign: 'center' }}>
            <Statistic
              title="Passes"
              value={questionDetail?.passes}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card style={{ padding: '24px', textAlign: 'center' }}>
            <Statistic
              title="Total Submissions"
              value={questionDetail?.total_submissions}
              precision={0}
              valueStyle={{ color: '#234abc' }}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: '10px', justifyContent: 'center' }}>
          <Button type="primary" href={`${pathname}/edit`}>Edit Question</Button>
          <Button type="default" href={`${pathname}/submissions`}>View Student Submissions</Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailContainer;
