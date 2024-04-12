'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography, Card, Row, Col, Spin, Pagination } from 'antd';
import { useGetPastSubmissionsQuery } from '@/redux/apis/student';

const { Title, Text } = Typography;

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
    <div className="h-full p-5 bg-[#f0f2f5]">
      <Title level={2} className="mb-[1.5%]">
        Past Submissions
      </Title>
      <div className="h-[92%] flex flex-col justify-between">
        {submissions?.length === 0 && (
          <div className="text-center">
            <h1>No record available!</h1>
          </div>
        )}
        <div>
          {submissions
            ?.slice()
            .sort((a, b) => b.pk - a.pk)
            .slice((page - 1) * pageSize, page * pageSize)
            .map((submission: StudentSubmission) => (
              <Card key={submission.pk} className="bg-[#ffffff] mb-5">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text className="text-[1.3rem]">
                      Submission Number:{' '}
                      {submission.submission_number ? submission.submission_number : <Spin />}
                    </Text>
                  </Col>
                  <Col>
                    <div>
                      {submission.score !== null ? (
                        <div>
                          <Text className="text-[1.3rem] mr-4">
                            Score: {submission.score} / {submission.total_score}
                          </Text>
                          <Link href={`${pathname}/${submission.pk}`} passHref>
                            <button
                              type="button"
                              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                              id={`${submission.pk}`}
                            >
                              View
                            </button>
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
            className="text-center"
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default PastSubmissionsContainer;
