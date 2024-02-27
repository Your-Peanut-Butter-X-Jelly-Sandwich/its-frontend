"use client"
import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
const { Item } = Form;
import { useLazyAuthSignupQuery } from "@/redux/apis/auth";

const SignUpContainer:React.FC<{isSignedUp: boolean; setSignedUp: (value: boolean) => void }> = ({isSignedUp, setSignedUp}) => {
    
    const [form] = Form.useForm();
    const handleSocialSignup = (provider: string) => {
        window.location.href = `http://127.0.0.1:8000/auth/${provider}/login`;
    };
    const [authSignup] = useLazyAuthSignupQuery();
    const handleSignup = async () => {
        const { user } = await authSignup({
        email: "e0y31928y@u.nus.edu",
        password: "123456ABCDEF$$$",
        }).unwrap();
    };
    const handleLoginClick = () => {
        setSignedUp(true);
    }

    return ( 
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={12} md={10} lg={8}>
          <div className="login-container">
            <Form form={form} layout="vertical">
              <Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email address!' }]}>
                <Input />
              </Item>
              <Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Item>
              <Item>
                <Button type="primary" htmlType="submit" onClick = {handleSignup}>
                  Sign Up
                </Button>
              </Item>
              <Row gutter={[16, 16]}>
                <Col>
                  <Item>
                    <Button type="primary" onClick={() => handleSocialSignup("google")}>
                      Google Signup
                    </Button>
                  </Item>
                </Col>
                <Col>
                  <Item>
                    <Button type="primary" onClick={() => handleSocialSignup("github")}>
                      Github Signup
                    </Button>
                  </Item>
                </Col>
              </Row>
              <Item>Already have an account? <Button type="primary" onClick = {() => handleLoginClick()}>Login</Button> </Item>
            </Form>
          </div>
        </Col>
      </Row>
     );
}
 
export default SignUpContainer;