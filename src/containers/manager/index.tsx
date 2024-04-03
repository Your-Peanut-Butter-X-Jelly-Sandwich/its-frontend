import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import StudentList from "./components/studentlist";
import { useLazyGetStudentsQuery } from "@/redux/apis/manager";
const { Title } = Typography;

const ManagerContainer: React.FC = () => {

  const [getStudents] = useLazyGetStudentsQuery();
  // console.log(data?.users);
  const [students, setStudents] = useState<IStudent[]>([]);

  const getStudentData = async () => {
    const res: {"users": IStudent[]} = await getStudents().unwrap();
    console.log(res);
    setStudents(res.users);
    console.log(res.users);
  }
  useEffect(() => {
    getStudentData();
  }, []);

  const handleCheckboxChange = (studentUsername: string, checked: boolean) => {
    console.log("Checkbox clicked for", studentUsername, "Checked:", checked);
    
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

      <StudentList students={students} onCheckboxChange={handleCheckboxChange} />
    </div>
  );
};

export default ManagerContainer;
