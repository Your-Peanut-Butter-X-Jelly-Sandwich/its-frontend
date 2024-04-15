import React from 'react';
import { Button, Space } from 'antd';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';

interface SocialSignupButtonProps {
  type: 'primary' | 'default';
  onClick: () => void;
  label: string;
}

const SocialSignupButton: React.FC<SocialSignupButtonProps> = ({ type, onClick, label }) => (
  <Button type={type} onClick={onClick} className="bg-blue-400 w-full">
    <Space>
      {label.toLowerCase().includes('google') && <GoogleOutlined />}
      {label.toLowerCase().includes('github') && <GithubOutlined />}
      {label}
    </Space>
  </Button>
);

export default SocialSignupButton;
