import React, { useState } from "react";
import { Typography } from "antd";
import StudentList from "./components/studentlist";
import { useGetStudentsQuery } from "@/redux/apis/manager";
const { Title } = Typography;

const ManagerContainer: React.FC = () => {

  const {data} = useGetStudentsQuery();
  console.log(data?.users);
  const [students, setStudents] = useState([
    { key: "1", username: "panav", email: "panavdua@gmail.com" },
    { key: "2", username: "test", email: "test@gmail.com" },
  ]);

  const handleCheckboxChange = (studentUsername: string, checked: boolean) => {
    console.log("Checkbox clicked for", studentUsername, "Checked:", checked);
    // Add your logic here to handle checkbox changes
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

      <StudentList students={students} onCheckboxChange={handleCheckboxChange} />
    </div>
  );
};

export default ManagerContainer;
