'use client';
import React from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const items = [
  { key: '1', label: <Link href="/en/student">Dashboard</Link> },
  { key: '2', label: <Link href="/en/student/questions">Questions</Link> },
];

const HeaderStudent: React.FC = () => {
  const [current, setCurrent] = React.useState<string>(
    String(window.location.pathname).split('/')[3] == 'questions' ? '2' : '1'
  );

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        className="h-full"
        selectedKeys={[current]}
        onClick={(e) => setCurrent(e.key.toString())}
      />
    </Header>
  );
};

export default HeaderStudent;
