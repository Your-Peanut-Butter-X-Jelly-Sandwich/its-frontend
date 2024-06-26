'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Menu, message } from 'antd';
import { UserAddOutlined, UserDeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useLazyAuthLogoutQuery } from '@/redux/apis/auth';
import { usePathname } from 'next/navigation';
import getLocale from '@/common/utils/extractLocale';
import { authSelector } from '@/redux/slices/auth';
import LanguageSelector from '@/components/LanguageSelector';
const HeaderManager: React.FC = () => {
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
      <Menu.Item key="student-list" icon={<UserAddOutlined />}>
        <Link href={`/${locale}/manager/`} passHref>
          <Menu.Item key="dashboard">Student List</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="tutor-list" icon={<UserDeleteOutlined />}>
        <Link href={`/${locale}/manager/tut-list/`} passHref>
          <Menu.Item key="dashboard">Tutor List</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item style={{ marginLeft: 'auto' }}>
        <LanguageSelector />
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        <Menu.Item key="dashboard">Log Out</Menu.Item>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderManager;
