"use client"
import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
const { Item } = Form;

const LoginContainer:React.FC<{isSignedUp: boolean; setSignedUp: (value: boolean) => void }> = ({isSignedUp, setSignedUp}) => {

    const [form] = Form.useForm();
    const handleSocialSignup = (provider: string) => {
        window.location.href = `http://127.0.0.1:8000/auth/${provider}/login`;
    };
    const handleSignUpClick = () => {
        setSignedUp(false);
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
                <Button type="primary" htmlType="submit">
                  Log in
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
              <Item>No account? <Button type="primary" onClick = {() => handleSignUpClick()}>Sign Up</Button> </Item>
            </Form>
          </div>
        </Col>
      </Row>

     );
}
 
export default LoginContainer;