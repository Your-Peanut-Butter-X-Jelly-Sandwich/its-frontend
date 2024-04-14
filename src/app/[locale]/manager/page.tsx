'use client';
import React from 'react';
import { NextPage } from 'next';
import StudentList from '@/containers/Manager/StudentList';

const ManagerPage: NextPage = () => {
  return (
    <div>
      <StudentList />
    </div>
  );
};

export default ManagerPage;
