'use client';
import React from 'react';
import { NextPage } from 'next';
import StudentList from '@/containers/Manager/StudentList';

const ManagerPage: NextPage = () => {
  return (
    <div className="h-full max-h-full">
      <StudentList />
    </div>
  );
};

export default ManagerPage;
