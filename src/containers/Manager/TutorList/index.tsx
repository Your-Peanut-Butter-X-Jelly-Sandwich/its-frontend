import React, { useState, useEffect } from 'react';
import List from '../StudentList/components/list';
import {
  useLazyGetTutorsQuery,
  usePromoteStudentsMutation,
  useDemoteTutorsMutation,
} from '@/redux/apis/manager';
import { message } from 'antd';

const TutorList: React.FC = () => {
  const [getTutors] = useLazyGetTutorsQuery();
  const [promoteStudents] = usePromoteStudentsMutation();
  const [demoteTutors] = useDemoteTutorsMutation();
  const [tutors, setTutors] = useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  useEffect(() => {
    const getTutorData = async () => {
      const res: { user: Tutor[] } = await getTutors().unwrap();
      setTutors(res.user);
    };
  
    getTutorData();
  }, [getTutors]);

  const handleCheckboxChange = (tutorId: number, checked: boolean) => {
    setSelectedIds((prevIds) => {
      if (checked) {
        return [...prevIds, tutorId];
      } else {
        return prevIds.filter((id) => id !== tutorId);
      }
    });
  };

  const handleDemoteToStudent = async () => {
    try {
      const request: DemoteTutorRequest = {
        tutor_ids: selectedIds,
      };
      await demoteTutors(request).unwrap();
      message.success('Demoted tutor(s) successfully');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      window.location.reload();
    } catch (err) {
      message.error('An error occurred while demoting the tutor(s)');
    }
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <List
        users={tutors}
        onCheckboxChange={handleCheckboxChange}
        handleButtonClick={handleDemoteToStudent}
        listTitle="Tutor List"
        buttonName="Demote to Student"
      />
    </div>
  );
  
};

export default TutorList;
