import React from 'react';
import { Space, Input, Divider } from 'antd';
import CustomButton from '../../Buttons/CustomButton';
import { useState } from 'react';
const TestCases: React.FC<ITutorTestCaseProps> = ({
  testCases,
  updateTestCase,
  addTestCase,
  removeLastTestCase,
}) => {
  return (
    <div className="flex-grow overflow-auto p-2.5">
      {testCases.map((testCase: ITutorTestCase, index: number) => (
        console.log('testCases', testCases),
        <React.Fragment key={index}>
          {index > 0 && <Divider />}
          <div className="mb-2.5 flex flex-col gap-2">
            <Input
              placeholder="Input"
              defaultValue={testCase.input}
              onChange={(e) => updateTestCase(index, 'input', e.target.value)}
            />
            <Input
              placeholder="Expected Output"
              defaultValue={testCase.output}
              onChange={(e) => updateTestCase(index, 'output', e.target.value)}
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
