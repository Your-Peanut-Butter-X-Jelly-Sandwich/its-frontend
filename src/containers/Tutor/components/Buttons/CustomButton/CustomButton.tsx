import React from 'react';
import { Button } from 'antd';

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  className: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label, className }) => (
  <div>
    <button
      className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ${className}`}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  </div>
);

export default CustomButton;
