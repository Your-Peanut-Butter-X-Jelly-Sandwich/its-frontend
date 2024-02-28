import React from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  type: 'primary' | 'default'; // Add more types as needed
  onClick: () => void;
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ type, onClick, label }) => (
  <Button type={type} onClick={onClick} style={{ backgroundColor: '#40a9ff', width: '100%' }}>
    {label}
  </Button>
);

export default CustomButton;