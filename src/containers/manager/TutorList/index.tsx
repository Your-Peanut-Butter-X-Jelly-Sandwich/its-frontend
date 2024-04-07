import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import List from "../components/list";
import { useLazyGetTutorsQuery, usePromoteStudentsMutation } from "@/redux/apis/manager";
import {message} from 'antd';
import { buffer } from "stream/consumers";

const TutorList: React.FC = () => {

  const [getTutors] = useLazyGetTutorsQuery();
  const [promoteStudents] = usePromoteStudentsMutation();
  const [tutors, setTutors] = useState<IStudent[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const getTutorData = async () => {
    const res: {"user": ITutor[]} = await getTutors().unwrap();
    console.log(res);
    setTutors(res.user);
  }

  useEffect(() => {
    getTutorData();
  }, []);

  const handleCheckboxChange = (tutorId: number, checked: boolean) => {
    console.log("Checkbox clicked for", tutorId, "Checked:", checked);
    setSelectedIds(prevIds => {
      if(checked) {
        return [...prevIds, tutorId];
      } else {
        return prevIds.filter(id => id !== tutorId);
      }
    });
    console.log(selectedIds);
  };

  const handlePromoteToTutor = async () => {
    try {
      const request: IPromoteStudentRequest = {
        student_ids: selectedIds
      };
      await promoteStudents(request).unwrap();
      message.success('Promoted students successfully')
      window.location.reload();
    } catch(err) {
      message.error('An error occurred while promoting the students');
    }
  }

  const handleDemoteToStudent = async () => {
    
  }
  const buffer = () => {

  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

      <List users={tutors} onCheckboxChange={handleCheckboxChange} handleButtonClick={handleDemoteToStudent}
      listTitle="Tutor List" buttonName="Demote to Student" assignStudentClick={buffer}/>
    </div>
  );
};

export default TutorList;
