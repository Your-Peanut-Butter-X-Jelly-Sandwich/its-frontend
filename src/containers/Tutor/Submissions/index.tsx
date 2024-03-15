"use client";
import React from "react";
import { Table, Button, Tag } from "antd";
import Link from 'next/link';

type PropsType = {
  qn_id: string;
};

const SubmissionsContainer: React.FC<PropsType> = ({ qn_id }) => {
  const columns = [
    {
      title: "Student Number",
      dataIndex: "studentNumber",
      key: "studentNumber",
    },
    {
      title: "Number of Attempts",
      dataIndex: "attempts",
      key: "attempts",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Submission Time",
      dataIndex: "submissionTime",
      key: "submissionTime",
    },
    {
      title: "KIV",
      dataIndex: "kiv",
      key: "kiv",
      render: (kiv) => (
        kiv ? <Tag color="blue">Yes</Tag> : <Tag>No</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" href={`/en/tutor/questions/${record.question}/submissions/${record.key}`}>View Detail</Button>
      ),
    },
  ];

  const data = [
    // Dummy data for example purposes
    {
      key: '1',
      studentNumber: '12345',
      attempts: 2,
      score: 85,
      submissionTime: '2024-03-15 14:00',
      kiv: true,
      id: 'submission1',
      question: 1,
    },
    {
      key: '2',
      studentNumber: '67890',
      attempts: 1,
      score: 60,
      submissionTime: '2024-03-15 14:00',
      kiv: false,
      id: 'submission2',
      question: 1,
    },
    {
      key: '3',
      studentNumber: '54321',
      attempts: 3,
      score: 95,
      submissionTime: '2024-03-15 14:00',
      kiv: true,
      id: 'submission3',
      question: 1,
    }
  ];

  const backButtonStyle = {
    backgroundColor: '#1890ff', 
    color: '#fff', 
    borderColor: '#1890ff', 
  };

  return (
    <div style={{ padding: 24, backgroundColor: "#fff", minHeight: "100vh" }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/en/tutor/questions/1`} passHref>
          <Button style={backButtonStyle}>Back to Question Insight</Button>
        </Link>
      </div>
      <h1>Submissions for Question {qn_id}</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );

};

export default SubmissionsContainer;
