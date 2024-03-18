"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Row, Col, Statistic, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Link from 'next/link'; 


type QuestionStatistics = {
  total_students: number;
  passes: number;
  total_submissions: number;
}

type PropsType = {
  qn_id: string;
};


const QuestionDetailContainer: React.FC<PropsType> = ({ qn_id }) => {
  const pathname = usePathname();
  const [statistics, setStatistics] = useState<QuestionStatistics>({ total_students: 0, passes: 0, total_submissions: 0 });
  const baseUrl = "http://127.0.0.1:8000";
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNzY1OTc3LCJpYXQiOjE3MTA2Nzk1NzcsImp0aSI6ImUyNzJkYzZhZWI0ZjQ2NGNhMjhkMzQ1NGU3NjQwMTk1IiwidXNlcl9pZCI6MTF9.4_QeJTep_Z1SW4Ndf7TZSJU50it52CQ9_ffDIU8yWPg";
  useEffect(() => {
    fetch(`${baseUrl}/tutor/question/${qn_id}`, {
        headers: {
    "Authorization": `Bearer ${authToken}`, 
  },
    })
      .then(response => response.json())
      .then(data => {
        setStatistics({
          total_students: data.total_students,
          passes: data.passes,
          total_submissions: data.total_submissions,
        });
      })
      .catch(error => console.error('Failed to fetch question statistics:', error));
  }, [qn_id]);


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
          <Card style={cardStyle}>
            <Statistic
              title="Total Students"
              value={statistics.total_students}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Passes"
              value={statistics.passes}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Total Submissions"
              value={statistics.total_submissions}
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
