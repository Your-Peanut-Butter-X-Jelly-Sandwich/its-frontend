import React from 'react';
import dayjs from 'dayjs';
import { Button, message, Space, Input, Select, Divider, DatePicker } from 'antd';

const SubHeader = ({
  questionTitle,
  setQuestionTitle,
  handleDueDateChange,
  handleLanguageChange,
  language,
  dueDate,
}) => {
  return (
      <div className="flex justify-between mb-5">
        <Input
          placeholder="Question Title"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          className="basis-7/12 grow-0 shrink-0 mr-4"
        />
        <DatePicker
          // value = {dueDate}
          value = {dayjs(dueDate, 'YYYY-MM-DD')}
          format="YYYY-MM-DD"
          placeholder="Select Due Date"
          onChange={handleDueDateChange}
          className="basis-3/12 grow-0 shrink-0 mr-4"
        />
        <Select
          value={language}
          onChange={handleLanguageChange}
          className="basis-2/12 grow-0 shrink-0"
          placeholder="Select Language"
        >
          <Select.Option value="c">C</Select.Option>
          <Select.Option value="python">Python</Select.Option>
        </Select>
      </div>
  );
};

export default SubHeader;
