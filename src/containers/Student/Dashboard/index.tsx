"use client";
import React from "react";
import { Card, Layout, Statistic, theme } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  PieChart,
  Pie,
} from "recharts";

const { Content } = Layout;

const data = [
  { name: "A", score: 100 },
  { name: "B", score: 98 },
  { name: "C", score: 98 },
  { name: "D", score: 88 },
  { name: "E", score: 48 },
  { name: "F", score: 80 },
  { name: "G", score: 43 },
];

const StudentDashboardContainer: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

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
      >
        <div className="lg:flex w-full justify-between h-[30%]">
          <Card bordered={false} className="lg:w-[23%] m-3">
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600", fontSize: "5.5rem" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
          <Card bordered={false} className="lg:w-[23%] m-3">
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322", fontSize: "5.5rem" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
          <Card bordered={false} className="lg:w-[23%] m-3">
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322", fontSize: "5.5rem" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
          <Card bordered={false} className="lg:w-[23%] m-3">
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322", fontSize: "5.5rem" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </div>
        <div className="lg:flex h-[70%] w-full">
          <LineChart
            width={screenWidth / 1.5}
            height={screenHeight / 1.65}
            data={data}
            margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#387908"
              yAxisId={1}
            />
          </LineChart>
          <PieChart width={screenWidth / 2.5} height={screenHeight / 1.65}>
            <Pie
              data={data}
              dataKey="score"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={screenHeight / 4}
              fill="#00d2ff"
              label
            />
          </PieChart>
        </div>
      </Content>
    </Layout>
  );
};

export default StudentDashboardContainer;
