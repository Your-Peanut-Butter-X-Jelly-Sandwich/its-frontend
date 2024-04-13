import { DoubleLeftOutlined } from '@ant-design/icons';
import React from 'react';
const ButtonBack = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <span
      onClick={() => history.back()}
      className="w-fit group cursor-pointer font-bold bg-white px-4 py-3 rounded-lg shadow-md hover:bg-[#4096ff] hover:text-white duration-200"
    >
      <DoubleLeftOutlined className="group-hover:-translate-x-2 duration-100" /> {children}
    </span>
  );
};

export default ButtonBack;
