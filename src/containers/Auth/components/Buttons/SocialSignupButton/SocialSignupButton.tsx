import React from 'react';
import { Button, Space } from 'antd';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';

interface SocialSignupButtonProps {
  type: 'primary' | 'default';
  onClick: () => void;
  label: string;
}

const SocialSignupButton: React.FC<SocialSignupButtonProps> = ({ type, onClick, label }) => (
  <Button type={type} onClick={onClick} style={{ backgroundColor: '#40a9ff', width: '100%' }}>
    <Space>
      {label === 'Google Signup' && <GoogleOutlined />}
      {label === 'Github Signup' && <GithubOutlined />}
      {label}
    </Space>
  </Button>
);

export default SocialSignupButton;
