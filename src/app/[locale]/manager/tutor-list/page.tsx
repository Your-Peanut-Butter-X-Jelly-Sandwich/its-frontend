"use client";
import React from "react";
import ManagerContainer from "@/containers/manager/StudentList";
import { NextPage } from "next";

const TutorListPage: NextPage = () => {
    return ( 
        <div>
            <ManagerContainer />
        </div>
     );
}
 
export default TutorListPage;