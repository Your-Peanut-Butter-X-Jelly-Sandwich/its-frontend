'use client';

import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Button, List, Avatar, Badge } from 'antd';
import { MessageOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const { Header, Content, Sider } = Layout;

const dummyNotifications = [
  { title: 'New assignment available', description: 'Assignment #3 is now available.' },
  { title: 'Meeting reminder', description: 'Project meeting tomorrow at 10 AM.' },
  { title: 'System update', description: 'System maintenance scheduled for this weekend.' },
];

const TutorDashboardContainer: React.FC = () => {
  const pathname = usePathname();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ padding: '0px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: 'white',
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={dummyNotifications}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={
                        <Badge dot>
                          <MessageOutlined />
                        </Badge>
                      }
                    />
                  }
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TutorDashboardContainer;
