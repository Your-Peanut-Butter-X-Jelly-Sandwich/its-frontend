'use client';

import React from 'react';
import { Menu } from 'antd';
import {
  DesktopOutlined,
  QuestionCircleOutlined,
  CheckSquareOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useLazyAuthLogoutQuery } from '@/redux/apis/auth';
import { usePathname } from 'next/navigation';
import getLocale from '@/common/utils/extractLocale';

const HeaderTutor: React.FC = () => {

  const [ authLogout ] = useLazyAuthLogoutQuery()
  const pathname = usePathname();
  
  const handleLogout = () => {

  }
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="dashboard" icon={<DesktopOutlined />}>
        <Link href="/en/tutor/" passHref>
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="add-question" icon={<QuestionCircleOutlined />}>
        <Link href="/en/tutor/add-question/" passHref>
          <Menu.Item key="dashboard">Add Question</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="check-questions" icon={<CheckSquareOutlined />}>
        <Link href="/en/tutor/questions/" passHref>
          <Menu.Item key="dashboard">Check Questions</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ marginLeft: 'auto' }} onClick={handleLogout}>
        <Menu.Item key="dashboard">Log Out</Menu.Item>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderTutor;
