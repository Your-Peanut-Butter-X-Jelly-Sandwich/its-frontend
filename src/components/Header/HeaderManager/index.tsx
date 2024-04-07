'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Menu, message } from 'antd';
import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useLazyAuthLogoutQuery } from '@/redux/apis/auth';
import { usePathname } from 'next/navigation';
import getLocale from '@/common/utils/extractLocale';
import { authSelector } from '@/redux/slices/auth';

const HeaderManager: React.FC = () => {

  const [ authLogout ] = useLazyAuthLogoutQuery()
  const pathname = usePathname();
  const { tokens } = useSelector(authSelector);

  const handleLogout = async () => {
    try {  
      const result = await authLogout({tokens}).unwrap();
      const locale = getLocale(pathname);
      if (result) {
        window.location.href = `/${locale}`;
      }
    } catch (error) {
      message.error('Error logging out');
    }
  }

  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="student-list" icon={<UserAddOutlined />}>
        <Link href="/en/manager/" passHref>
          <Menu.Item key="dashboard">Student List</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="tutor-list" icon={<UserDeleteOutlined />}>
        <Link href="/en/manager/tutor-list/" passHref>
          <Menu.Item key="dashboard">Tutor List</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="assign-students" icon={<UserSwitchOutlined />}>
        <Link href="/en/manager/assign-students/" passHref>
          <Menu.Item key="dashboard">Assign Students</Menu.Item>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ marginLeft: 'auto' }} onClick={handleLogout}>
        <Menu.Item key="dashboard">Log Out</Menu.Item>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderManager;



