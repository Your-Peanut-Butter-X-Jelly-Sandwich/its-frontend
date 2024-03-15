"use client"
import React from "react";
import { Row, Col, Form, Input, Button, Card } from "antd";
const { Item } = Form;
import { useLazyAuthSignupQuery } from "@/redux/apis/auth";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import SocialSignupButton from "../Buttons/SocialSignupButton/SocialSignupButton";


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
          <Card title="Sign Up" style={{ width: '100%', maxWidth: 400, borderRadius: 8 }}>
            <Form form={form} layout="vertical">
              <Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email address!' }]}>
                <Input />
              </Item>
              <Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Item>
              <Item>
                <CustomButton type="primary" onClick={handleSignup} label="Sign Up" />
              </Item>
              <Item>
                <SocialSignupButton type="primary" onClick={() => handleSocialSignup("google")} label="Google Signup"/>
              </Item>
              <Item>
                <SocialSignupButton type="primary" onClick={() => handleSocialSignup("github")} label="Github Signup"/>
              </Item>
              <Item>Already have an account? <CustomButton type="primary" onClick = {() => handleLoginClick()} label="Login" /> </Item>
            </Form>
          </Card>
        </Col>
      </Row>
     );
}
 
export default SignUpContainer;