'use client';
import React from 'react';
import TutorList from '@/containers/manager/TutorList';
import { NextPage } from 'next';

const TutorListPage: NextPage = () => {
  return (
    <div>
      <TutorList />
    </div>
  );
};

export default TutorListPage;
