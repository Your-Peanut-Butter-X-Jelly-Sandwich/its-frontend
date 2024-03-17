"use client";
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Link from 'next/link';

type SubmissionType = {
  pk: number;
  submission_number: number;
  submitted_by: {
    email: string;
    organisation: string;
    username: string;
    is_student: boolean;
    is_tutor: boolean;
    is_manager: boolean;
  };
  score: number;
  total_score: number;
  submission_date: string;
};

type PropsType = {
  qn_id: string;
};

const SubmissionsContainer: React.FC<PropsType> = ({ qn_id }) => {
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);

  useEffect(() => {
    const baseUrl = "http://127.0.0.1:8000";
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNjc5NTcxLCJpYXQiOjE3MTA1OTMxNzEsImp0aSI6IjJlNGZjYjE5MDJjNzQxNDQ5OTU3YTg4Nzg0MTM4MGNmIiwidXNlcl9pZCI6MTF9.4YliXiwUPmhhAgTsNayaAET_0RXL7FWMK2pE4iiLJdk"; 

    fetch(`${baseUrl}/tutor/submission?qn_id=${qn_id}`, {
      headers: {
        "Authorization": `Bearer ${authToken}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmissions(data.submissions);
      })
      .catch((error) => {
        console.error("Error fetching submissions:", error);
      });
  }, [qn_id]);

  const columns = [
    {
      title: "Student Email",
      dataIndex: ["submitted_by", "email"],
      key: "email",
    },
    {
      title: "Submission Number",
      dataIndex: "submission_number",
      key: "submission_number",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Submission Time",
      dataIndex: "submission_date",
      key: "submission_date",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link href={`/en/tutor/questions/${qn_id}/submissions/${record.pk}`} passHref>
          <Button type="primary">View Detail</Button>
        </Link>
      ),
    },
  ];

  const backButtonStyle = {
    backgroundColor: '#1890ff',
    color: '#fff',
    borderColor: '#1890ff',
  };

  return (
    <div style={{ padding: 24, backgroundColor: "#fff", minHeight: "100vh" }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/en/tutor/questions/${qn_id}`} passHref>
          <Button style={backButtonStyle}>Back to Question Insight</Button>
        </Link>
      </div>
      <h1>Submissions for Question {qn_id}</h1>
      <Table columns={columns} dataSource={submissions.map((submission, index) => ({
        ...submission,
        key: index,
      }))} />
    </div>
  );
};

export default SubmissionsContainer;
