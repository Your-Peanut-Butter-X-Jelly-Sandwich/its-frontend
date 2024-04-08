'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Typography, Card, Row, Col, Spin, Pagination } from 'antd';
import { useGetPastSubmissionsQuery } from '@/redux/apis/student';

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

type PropsType = { qn_id: string };

const PastSubmissionsContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();
  const pageSize = 7;
  const [page, setPage] = React.useState(1);

  const { data } = useGetPastSubmissionsQuery({ qn_id: Number(qn_id) });
  const submissions = data?.submissions;

  React.useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 5000);

    if (submissions?.slice().sort((a, b) => b.pk - a.pk)[0]?.score !== null) {
      clearInterval(interval);
    }
  }, [submissions]);

  return (
    <div style={PAGE} className="h-full">
      <Title level={2} style={{ marginBottom: '1.5%' }}>
        Past Submissions
      </Title>
      <div className="h-[92%] flex flex-col justify-between">
        <div>
          {submissions
            ?.slice()
            .sort((a, b) => b.pk - a.pk)
            .slice((page - 1) * pageSize, page * pageSize)
            .map((submission: IStudentSubmission) => (
              <Card style={CARD} key={submission.pk}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text style={{ fontSize: '1.3rem' }}>
                      Submission Number:{' '}
                      {submission.submission_number ? submission.submission_number : <Spin />}
                    </Text>
                  </Col>
                  <Col>
                    <div>
                      {submission.score !== null ? (
                        <div>
                          <Text style={{ fontSize: '1.3rem', marginRight: '15px' }}>
                            Score: {submission.score} / {submission.total_score}
                          </Text>
                          <Link href={`${pathname}/${submission.pk}`} passHref>
                            <Button type="primary" className="bg-blue-500">
                              View
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Spin />
                      )}
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
        </div>
        <div>
          <Pagination
            defaultCurrent={1}
            total={submissions?.length}
            pageSize={pageSize}
            style={{ textAlign: 'center' }}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default PastSubmissionsContainer;
