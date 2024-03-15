"use client";
import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;

const StudentDashboardContainer: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-full" style={{ padding: "0 24px 24px" }}>
      <Content
        style={{
          padding: 24,
          marginTop: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      ></Content>
    </Layout>
  );
};

export default StudentDashboardContainer;
