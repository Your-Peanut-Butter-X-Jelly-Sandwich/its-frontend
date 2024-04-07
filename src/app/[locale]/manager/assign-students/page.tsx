"use client";
import React from "react";
import ManagerContainer from "@/containers/manager/StudentList";
import { NextPage } from "next";

const AssignStudentPage: NextPage = () => {
    return ( 
        <div>
            <ManagerContainer />
        </div>
     );
}
 
export default AssignStudentPage;