import React from 'react';
import { Button, message, Space, Input, Select, Divider, DatePicker } from 'antd';
import CustomButton from '../../Buttons/CustomButton/CustomButton';

const TestCases: React.FC<ITutorTestCaseProps> = ({
  testCases,
  updateTestCase,
  addTestCase,
  removeLastTestCase,
}) => {
  return (
    <div className="flex-grow overflow-auto p-2.5">
      {testCases.map((testCase: ITutorTestCaseResponse, index: number) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider />}
          <div className="mb-2.5">
            <Input
              placeholder="Input"
              value={testCase.input}
              onChange={(e) => updateTestCase(index, 'input', e.target.value)}
            />
            <Input
              placeholder="Expected Output"
              value={testCase.expectedOutput}
              onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
            />
          </div>
        </React.Fragment>
      ))}
      <Space>
        <CustomButton
          className="bg-blue-600 text-white border border-blue-600 h-10"
          onClick={addTestCase}
          label="Add Test Case"
        />
        <CustomButton
          className="bg-red-600 text-white border border-red-600 h-10"
          onClick={removeLastTestCase}
          label="Remove Last Test Case"
        />
      </Space>
    </div>
  );
};

export default TestCases;
