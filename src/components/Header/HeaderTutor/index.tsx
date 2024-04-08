'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Menu, message } from 'antd';
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
import { authSelector } from '@/redux/slices/auth';

const HeaderTutor: React.FC = () => {
  const [authLogout] = useLazyAuthLogoutQuery();
  const pathname = usePathname();
  const { tokens } = useSelector(authSelector);
  const locale = getLocale(pathname);

  const handleLogout = async () => {
    try {
      const result = await authLogout({ tokens }).unwrap();
      const locale = getLocale(pathname);
      if (result) {
        window.location.href = `/${locale}`;
      }
    } catch (error) {
      message.error('Error logging out');
    }
  };
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="dashboard" icon={<DesktopOutlined />}>
        <Link href={`/${locale}/tutor/`} passHref>
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="add-question" icon={<QuestionCircleOutlined />}>
        <Link href={`/${locale}/tutor/add-question/`} passHref>
          <Menu.Item key="dashboard">Add Question</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="check-questions" icon={<CheckSquareOutlined />}>
        <Link href={`/${locale}/tutor/questions/`} passHref>
          <Menu.Item key="dashboard">Check Questions</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        style={{ marginLeft: 'auto' }}
        onClick={handleLogout}
      >
        <Menu.Item key="dashboard">Log Out</Menu.Item>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderTutor;
