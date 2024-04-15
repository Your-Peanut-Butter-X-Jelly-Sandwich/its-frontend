'use client';
import React from 'react';
import TutorList from '@/containers/Manager/TutorList';
import { NextPage } from 'next';

const TutorListPage: NextPage = () => {
  return (
    <div className="h-full max-h-full">
      <TutorList />
    </div>
  );
};

export default TutorListPage;
