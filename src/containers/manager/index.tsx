import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import StudentList from "./components/studentlist";
import { useLazyGetStudentsQuery, usePromoteStudentsMutation } from "@/redux/apis/manager";
import {message} from 'antd';

const ManagerContainer: React.FC = () => {

  const [getStudents] = useLazyGetStudentsQuery();
  const [promoteStudents] = usePromoteStudentsMutation();
  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const getStudentData = async () => {
    const res: {"user": IStudent[]} = await getStudents().unwrap();
    console.log(res);
    setStudents(res.user);
  }

  useEffect(() => {
    getStudentData();
  }, []);

  const handleCheckboxChange = (studentId: number, checked: boolean) => {
    console.log("Checkbox clicked for", studentId, "Checked:", checked);
    setSelectedIds(prevIds => {
      if(checked) {
        return [...prevIds, studentId];
      } else {
        return prevIds.filter(id => id !== studentId);
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

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

      <StudentList students={students} onCheckboxChange={handleCheckboxChange} handlePromoteToTutor={handlePromoteToTutor}/>
    </div>
  );
};

export default ManagerContainer;
