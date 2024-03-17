"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Typography, Card, Row, Col } from "antd";
import { useGetPastSubmissionsQuery } from "@/redux/apis/student/PastSubmissions";

const { Title, Text } = Typography;

const PAGE = {
  padding: "20px",
  backgroundColor: "#f0f2f5",
  minHeight: "100vh",
};

const CARD = {
  backgroundColor: "#ffffff",
  marginBottom: "20px",
};

const VIEW_BUTTON = {
  backgroundColor: "#1890ff",
  color: "#fff",
  borderColor: "#1890ff",
};

type PropsType = { qn_id: string };

const PastSubmissionsContainer: React.FC<PropsType> = ({
  qn_id,
}: PropsType) => {
  const pathname = usePathname();

  const { data } = useGetPastSubmissionsQuery({ qn_id: Number(qn_id) });
  const submissions = data?.submissions;

  return (
    <div style={PAGE}>
      <Title level={2} style={{ marginBottom: "1.5%" }}>
        Past Submissions
      </Title>
      {submissions?.map((submission: ISubmission) => (
        <Card style={CARD} key={submission.pk}>
          <Row justify="space-between" align="middle">
            <Col>
              <Text style={{ fontSize: "1.3rem" }}>
                Submission Number: {submission.submission_number}
              </Text>
            </Col>
            <Col>
              <Link href={`${pathname}/${submission.pk}`} passHref>
                <Button style={VIEW_BUTTON}>View</Button>
              </Link>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default PastSubmissionsContainer;
