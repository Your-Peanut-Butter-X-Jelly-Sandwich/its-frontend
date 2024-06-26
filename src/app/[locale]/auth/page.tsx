'use client';
import React from 'react';
import AuthContainer from '@/containers/Auth';
import { NextPage } from 'next';

const AuthPage: NextPage = () => {
  return (
    <div className="h-screen">
      <AuthContainer />
    </div>
  );
};

export default AuthPage;
