'use client';
import React from 'react';
import { useLazyAuthLoginQuery } from '@/redux/apis/auth';
import { usePathname } from 'next/navigation';
import getLocale from '@/common/utils/extractLocale';
import { Divider, Form, Input, message, Card } from 'antd';
const { Item } = Form;
import CustomButton from '../Register/components/CustomButton/CustomButton';
import SocialSignupButton from '../Register/components/SocialSignupButton/SocialSignupButton';

const LoginContainer: React.FC<{ setIsSignUp: (value: boolean) => void }> = ({ setIsSignUp }) => {
  const [form] = Form.useForm();
  const [authLogin] = useLazyAuthLoginQuery();
  const pathname = usePathname();

  const handleSocialSignup = (provider: string) => {
    window.location.href = `http://127.0.0.1:8000/auth/${provider}/login`;
  };
  const handleSignUpClick = () => {
    setIsSignUp(true);
  };
  const handleLogin = async () => {
    try {
      const email = form.getFieldValue('email');
      const password = form.getFieldValue('password');
      const result = await authLogin({ email, password }).unwrap();

      if (result) {
        const { user } = result;
        const locale = getLocale(pathname);

        if (user.is_tutor) {
          window.location.href = `/${locale}/tutor`;
        } else if (user.is_student) {
          window.location.href = `/${locale}/student`;
        } else if (user.is_manager) {
          window.location.href = `/${locale}/manager`;
        }
      }
    } catch (error) {
      message.error('Email or password is incorrect');
    }
  };

  return (
    <Card title="Login" style={{ width: '100%', maxWidth: 400, borderRadius: 8 }}>
      <Form form={form} layout="vertical">
        <Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Item>
        <Divider className="my-10">
          <span className="text-gray-300">•</span>
        </Divider>
        <Item>
          <CustomButton type="primary" onClick={handleLogin} label="Login" id="login-button" />
        </Item>
        <Item>
          <SocialSignupButton
            type="primary"
            onClick={() => handleSocialSignup('google')}
            label="Continue with Google"
          />
        </Item>
        <Item>
          <SocialSignupButton
            type="primary"
            onClick={() => handleSocialSignup('github')}
            label="Continue with Github"
          />
        </Item>
        <Item>
          No account yet?{' '}
          <a onClick={() => handleSignUpClick()} style={{ textDecoration: 'underline' }}>
            Sign up
          </a>{' '}
        </Item>
      </Form>
    </Card>
  );
};

export default LoginContainer;
