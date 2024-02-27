"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Typography, List, Card } from "antd";
const { Title, Text } = Typography;

type PropsType = { qn_id: string };

const PastSubmissionsContainer: React.FC<PropsType> = ({ qn_id }: PropsType) => {
  const pathname = usePathname();
  const submissions = [
    { id: 1, title: "Submission 1" },
    { id: 2, title: "Submission 2" },

  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={4}>
        Here you can see ALL past attempts for question <Text type="danger">{qn_id}</Text> and the corresponding reports.
      </Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={submissions}
        renderItem={item => (
          <List.Item>
            <Card>
              <Link href={`${pathname}/${item.id}`} passHref>
                <Button type="primary" style={{ backgroundColor: '#1890ff', color: '#fff' }}>{item.title}</Button>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PastSubmissionsContainer;

