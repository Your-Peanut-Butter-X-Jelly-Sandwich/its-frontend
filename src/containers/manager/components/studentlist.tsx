import React from 'react';
import { Typography, Table, Checkbox } from 'antd';

const { Title } = Typography;

interface Student {
    key: React.Key;
    username: string;
    email: string;
}

interface StudentListProps {
    students: Student[];
    onCheckboxChange: (username: string, checked: boolean) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onCheckboxChange }) => {
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mark as Tutor',
            dataIndex: 'convert',
            key: 'convert',
            render: (text: string, record: Student) => (
                <Checkbox onChange={(e) => onCheckboxChange(record.username, e.target.checked)} />
            ),
        },
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Title level={2} style={{ marginBottom: '1.5%' }}>
                Student List
            </Title>
            <Table
                columns={columns}
                dataSource={students}
                pagination={false}
                scroll={{ x: 'max-content' }}
                style={{ backgroundColor: '#ffffff' }}
            />
        </div>
    );
};

export default StudentList;
