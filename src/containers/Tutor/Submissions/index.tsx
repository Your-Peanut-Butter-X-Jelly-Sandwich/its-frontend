'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import Link from 'next/link';
import { useGetSubmissionsQuery } from '@/redux/apis/tutor/Submissions';

const SubmissionsContainer: React.FC<PropsType> = ({ qn_id }) => {
  const { data: submissions, isLoading, isError } = useGetSubmissionsQuery(qn_id);
  console.log(submissions);

  const columns = [
    {
      title: 'Student Email',
      dataIndex: ['submitted_by', 'email'],
      key: 'email',
    },
    {
      title: 'Submission Number',
      dataIndex: 'submission_number',
      key: 'submission_number',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Submission Time',
      dataIndex: 'submission_date',
      key: 'submission_date',
      render: (text: any) => new Date(text).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Link href={`/en/tutor/questions/${qn_id}/submissions/${record.pk}`} passHref>
          <Button
            style={{ backgroundColor: '#1890ff', color: '#fff', borderColor: '#1890ff' }}
            type="primary"
          >
            View Detail
          </Button>
        </Link>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching submissions.</div>;

  return (
    <div style={{ padding: 24, backgroundColor: '#fff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/en/tutor/questions/${qn_id}`} passHref>
          <Button style={{ backgroundColor: '#1890ff', color: '#fff', borderColor: '#1890ff' }}>
            Back to Question Insight
          </Button>
        </Link>
      </div>
      <h1>Submissions for Question {qn_id}</h1>
      <Table
        columns={columns}
        // @ts-ignore
        dataSource={submissions.submissions.map((submission: any) => ({
          ...submission,
          key: submission.pk,
        }))}
      />
    </div>
  );
};

export default SubmissionsContainer;
