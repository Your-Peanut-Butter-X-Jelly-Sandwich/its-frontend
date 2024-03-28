import React from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  type: 'primary' | 'default';
  onClick: () => void;
  label: string;
  className?: string;
  id?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label, className, id }) => (
  <Button className={className} onClick={onClick} id={id}>
    {label}
  </Button>
);

export default CustomButton;
