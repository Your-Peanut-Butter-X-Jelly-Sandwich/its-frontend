import React from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  className: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label, className }) => (
  <Button className={className} onClick={onClick}>
    {label}
  </Button>
);

export default CustomButton;
