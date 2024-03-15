"use client"
import React from "react";
import { Row, Col, Form, Input, Button, Card } from "antd";
const { Item } = Form;
import CustomButton from "../Buttons/CustomButton/CustomButton";
import SocialSignupButton from "../Buttons/SocialSignupButton/SocialSignupButton";

const LoginContainer:React.FC<{isSignedUp: boolean; setSignedUp: (value: boolean) => void }> = ({isSignedUp, setSignedUp}) => {

    const [form] = Form.useForm();
    const handleSocialSignup = (provider: string) => {
        window.location.href = `http://127.0.0.1:8000/auth/${provider}/login`;
    };
    const handleSignUpClick = () => {
        setSignedUp(false);
    }
    const handleLogin = async () => {
        
    };

    
    return ( 
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={12} md={10} lg={8}>
          <Card title="Login" style={{ width: '100%', maxWidth: 400, borderRadius: 8 }}>
            <Form form={form} layout="vertical">
              <Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email address!' }]}>
                <Input />
              </Item>
              <Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Item>
              <Item>
                <CustomButton type="primary" onClick={handleLogin} label="Login" />
              </Item>
              <Item>
                <SocialSignupButton type="primary" onClick={() => handleSocialSignup("google")} label="Google Signup"/>
              </Item>
              <Item>
                <SocialSignupButton type="primary" onClick={() => handleSocialSignup("github")} label="Github Signup"/>
              </Item>
              <Item>Don't have an account? <a onClick={() => handleSignUpClick()} style={{ textDecoration: 'underline' }}>Sign up</a> </Item>
            </Form>
          </Card>
        </Col>
      </Row>

     );
}
 
export default LoginContainer;