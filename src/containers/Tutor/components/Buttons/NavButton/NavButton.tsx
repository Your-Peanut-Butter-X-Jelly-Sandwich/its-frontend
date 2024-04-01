import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';

interface NavButtonProps {
  href: string;
  buttonText: string;
  className: string;
}

const NavButton: React.FC<NavButtonProps> = ({ className, href, buttonText }) => {
  return (
    <div className="mb-5">
      <Link href={href} passHref>
        <button className={className}>{buttonText}</button>
      </Link>
    </div>
  );
};

export default NavButton;
