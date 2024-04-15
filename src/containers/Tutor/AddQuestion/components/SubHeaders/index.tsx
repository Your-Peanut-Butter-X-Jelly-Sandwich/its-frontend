import React from 'react';
import dayjs from 'dayjs';
import { Input, Select, DatePicker } from 'antd';
type SubHeaderProps = {
  questionTitle: string;
  setQuestionTitle: (title: string) => void;
  handleDueDateChange: (date: any, dateString: string) => void;
  handleLanguageChange: (value: string) => void;
  language: string;
  dueDate: string;
};
const SubHeader: React.FC<SubHeaderProps> = ({
  questionTitle,
  setQuestionTitle,
  handleDueDateChange,
  handleLanguageChange,
  language,
  dueDate,
}) => {
  return (
    <div className="flex justify-between">
      <Input
        placeholder="Question Title"
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
        className="basis-1/2 grow-0 shrink-0 mr-4"
      />
      <DatePicker
        // value = {dueDate}
        value={dueDate ? dayjs(dueDate, 'YYYY-MM-DD') : null}
        format="YYYY-MM-DD"
        placeholder="Select Due Date"
        // @ts-ignore
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
