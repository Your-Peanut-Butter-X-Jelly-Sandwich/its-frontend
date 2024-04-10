import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import List from './components/list';
import {
  useLazyGetStudentsQuery,
  usePromoteStudentsMutation,
  useAssignStudentsMutation,
} from '@/redux/apis/manager';
import { message } from 'antd';

const StudentList: React.FC = () => {
  const [getStudents] = useLazyGetStudentsQuery();
  const [promoteStudents] = usePromoteStudentsMutation();
  const [assignStudents] = useAssignStudentsMutation();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const getStudentData = async () => {
    const res: { user: Student[] } = await getStudents().unwrap();
    setStudents(res.user);
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const handleCheckboxChange = (studentId: number, checked: boolean) => {
    setSelectedIds((prevIds) => {
      if (checked) {
        return [...prevIds, studentId];
      } else {
        return prevIds.filter((id) => id !== studentId);
      }
    });
  };

  const handlePromoteToTutor = async () => {
    try {
      const request: PromoteStudentRequest = {
        student_ids: selectedIds,
      };
      await promoteStudents(request).unwrap();
      message.success('Promoted student(s) successfully');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      message.error('An error occurred while promoting the student(s)');
    }
  };

  const handleAssignToTutor = () => {
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    const tutorId = parseInt(inputValue);
    if (!isNaN(tutorId)) {
      try {
        const request: AssignStudentRequest = {
          tutor_id: tutorId,
          student_ids: selectedIds,
        };
        const response = await assignStudents(request).unwrap();

        const { success, error } = response;

        if (success && success.length > 0 && !error) {
          // All students were successfully assigned
          const successfulIds = success.map(([tutId, stuId]) => stuId);
          message.success('Successfully assigned student IDs: ' + successfulIds.join(', '));
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else if (!success && error && error.length > 0) {
          // All students assignment failed
          const unsuccessfulPairs = error.map(({ pair, reason }) => ({
            studentId: pair[1],
            reason,
          }));
          message.error('Unable to assign: ' + JSON.stringify(unsuccessfulPairs));
        } else if (success && success.length > 0 && error && error.length > 0) {
          // Mixed results (some successful, some failed)
          const successfulIds = success.map(([tutId, stuId]) => stuId);
          const unsuccessfulPairs = error.map(({ pair, reason }) => ({
            studentId: pair[1],
            reason,
          }));
          message.success('Successfully assigned student IDs: ' + successfulIds.join(', '));
          message.error('Unable to assign: ' + JSON.stringify(unsuccessfulPairs));
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          // Unexpected response format or no data
          message.error('Invalid response format from server or no data returned');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        
      } catch (err) {
        console.error('An error occurred while assigning students:', err);
        message.error('An error occurred while assigning the student(s)');
      }
    } else {
      message.error('Please enter a valid numerical value for the tutor ID.');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setInputValue(''); // Reset input value
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <List
        users={students}
        onCheckboxChange={handleCheckboxChange}
        handleButtonClick={handlePromoteToTutor}
        listTitle="Student List"
        buttonName="Promote to Tutor"
        assignStudentClick={handleAssignToTutor}
      />
      <Modal
        title="Assign Students to Tutor"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Enter the tutor ID:</p>
        <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </Modal>
    </div>
  );
};

export default StudentList;
