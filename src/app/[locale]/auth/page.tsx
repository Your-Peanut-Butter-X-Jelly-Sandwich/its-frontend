"use client";
import { NextPage } from "next";
import { useLazyAuthSignupQuery } from "@/redux/apis/auth";
import { Button } from "antd";
const AuthPage: NextPage = () => {
  const [authSignup] = useLazyAuthSignupQuery();

  const handleSocialSignup = (provider: string) => {
    window.location.href = `http://127.0.0.1:8000/auth/${provider}/login`;
  };
  const handleSignup = async () => {
    const { user } = await authSignup({
      email: "e0y31928y@u.nus.edu",
      password: "123456ABCDEF$$$",
    }).unwrap();
  };
  return (
    <div>
      <Button onClick={() => handleSocialSignup("google")}>
        Google Signup
      </Button>
      <Button onClick={() => handleSocialSignup("github")}>
        Github Signup
      </Button>
      <Button onClick={handleSignup}>Signup</Button>
      <Button>Login</Button>
    </div>
  );
};

export default AuthPage;
