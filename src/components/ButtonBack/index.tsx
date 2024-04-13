import { DoubleLeftOutlined } from '@ant-design/icons';
import React from 'react';
import Link from 'next/link';
const ButtonBack = ({
  children,
  url,
}: Readonly<{
  children: React.ReactNode;
  url: string;
}>) => {
  return (
    <span className="w-fit group cursor-pointer font-bold bg-white px-4 py-3 rounded-lg shadow-md hover:bg-[#4096ff] hover:text-white duration-200">
      <Link href={url}>
        <DoubleLeftOutlined className="group-hover:-translate-x-2 duration-100" /> {children}
      </Link>
    </span>
  );
};

export default ButtonBack;
