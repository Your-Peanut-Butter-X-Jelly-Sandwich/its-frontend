import React from 'react';
import { List, Tag } from 'antd';
import { FireTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
type QuestionListType = {
  questions: IStudentQuestion[];
  time: 'week' | 'month';
};
const QuestionList: React.FC<QuestionListType> = ({ questions, time }: QuestionListType) => {
  const pathname = usePathname();
  const data = questions.map((qn) => {
    return {
      pk: qn.pk,
      title: qn.question_title,
      due_date: qn.due_date,
      assigner: qn.pub_by.email,
      attempted: qn.attempted,
      passed: qn.passed,
    };
  });
  return (
    <div className="flex flex-col bg-white mt-6 p-8 rounded-md shadow-md max-h-full overflow-hidden">
      <div className="font-semibold">
        Questions Due in a {time}{' '}
        <span>
          <FireTwoTone twoToneColor={time == 'week' ? '#f50' : '#87d068'} />
        </span>
      </div>
      <div className="mt-5 max-h-full overflow-scroll">
        <List
          className=""
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <Link href={`${pathname}/questions/${item.pk}`}>
              <List.Item key={index} className="cursor-pointer hover:bg-gray-100">
                <List.Item.Meta
                  title={
                    <div className="flex flex-row">
                      <div className="text-base cursor-pointer font-semibold px-2">
                        {item.title}
                      </div>
                      {item.attempted ? <Tag color="#f50">Attempted</Tag> : <></>}
                      {item.passed ? <Tag color="#87d068">Passed</Tag> : <></>}
                    </div>
                  }
                  description={
                    <div className="flex flex-col px-2">
                      <div>Assigned by: {item.assigner}</div>
                      <div>Due by: {item.due_date}</div>
                    </div>
                  }
                />
              </List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  );
};

export default QuestionList;
