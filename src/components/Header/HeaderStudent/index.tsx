"use client";
import React from "react";
import Link from "next/link";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const items = [
  { key: "1", label: <Link href="/en/student">Dashboard</Link> },
  { key: "2", label: <Link href="/en/student/questions">Questions</Link> },
];

const HeaderStudent: React.FC = () => {
  return (
    <Header
      style={{ display: "flex", alignItems: "center" }}
      className="h-full"
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        className="h-full"
      />
    </Header>
  );
};

export default HeaderStudent;
