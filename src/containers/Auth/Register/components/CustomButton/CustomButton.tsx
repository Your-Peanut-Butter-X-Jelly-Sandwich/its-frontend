import React from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  type: 'primary' | 'default';
  onClick: () => void;
  label: string;
  className?: string;
  id?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label, id }) => (
  <Button className="w-full" onClick={onClick} id={id}>
    {label}
  </Button>
);

export default CustomButton;
