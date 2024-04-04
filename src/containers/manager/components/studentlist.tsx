import React from 'react';
import { Typography, Table, Checkbox, Button } from 'antd';

const { Title } = Typography;

interface StudentListProps {
    students: IStudent[];
    onCheckboxChange: (id: number, checked: boolean) => void;
    handlePromoteToTutor: () => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onCheckboxChange, handlePromoteToTutor}) => {
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mark as Tutor',
            dataIndex: 'convert',
            key: 'convert',
            render: (text: string, record: IStudent) => (
                <Checkbox onChange={(e) => onCheckboxChange(record.id, e.target.checked)} />
            ),
        },
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Title level={2} >
                Student List
            </Title>
            <Button style={{marginBottom: '2%'}} onClick={handlePromoteToTutor}>Mark as Tutor</Button>
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
