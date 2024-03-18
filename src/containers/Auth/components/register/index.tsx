"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/slices/auth";
import { Row, Col, Form, Input, message, Card } from "antd";
import { usePathname } from "next/navigation";
import getLocale from "@/common/utils/extractLocale";
const { Item } = Form;
import { useLazyAuthSignupQuery } from "@/redux/apis/auth";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import SocialSignupButton from "../Buttons/SocialSignupButton/SocialSignupButton";

const SignUpContainer: React.FC<{
  isSignedUp: boolean;
  setSignedUp: (value: boolean) => void;
}> = ({ isSignedUp, setSignedUp }) => {
  const [form] = Form.useForm();
  const pathname = usePathname();
  const handleSocialSignup = (provider: string) => {
    window.location.href = `http://127.0.0.1:8000/auth/${provider}/login`;
  };
  const [authSignup] = useLazyAuthSignupQuery();
  const { isAuthenticated, user } = useSelector(authSelector);

  useEffect(() => {
    if (isAuthenticated) {
      const locale = getLocale(pathname);
      if (user.is_student) {
        window.location.href = `/${locale}/student`;
      } else if (user.is_tutor) {
        window.location.href = `/${locale}/tutor`;
      } else if (user.is_manager) {
        window.location.href = `/${locale}/manager`;
      }
    }
  }, [isAuthenticated, user]);

  const handleSignup = async () => {
    try {
      const email = form.getFieldValue("email");
      const password = form.getFieldValue("password");
      const result = await authSignup({ email, password }).unwrap();
      if (result) {
        setSignedUp(true);
      }
    } catch (error) {
      message.error("Error signing up");
    }
  };
  const handleLoginClick = () => {
    setSignedUp(true);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={12} md={10} lg={8}>
        <Card
          title="Sign Up"
          style={{ width: "100%", maxWidth: 400, borderRadius: 8 }}
        >
          <Form form={form} layout="vertical">
            <Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Item>
            <Item>
              <CustomButton
                type="primary"
                onClick={handleSignup}
                label="Sign Up"
              />
            </Item>
            <Item>
              <SocialSignupButton
                type="primary"
                onClick={() => handleSocialSignup("google")}
                label="Google Signup"
              />
            </Item>
            <Item>
              <SocialSignupButton
                type="primary"
                onClick={() => handleSocialSignup("github")}
                label="Github Signup"
              />
            </Item>
            <Item>
              Already have an account?{" "}
              <a
                onClick={() => handleLoginClick()}
                style={{ textDecoration: "underline" }}
              >
                Login
              </a>
            </Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUpContainer;
