'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import LoginContainer from './Login';
import SignUpContainer from './Register';
import { useSearchParams } from 'next/navigation';
const AuthContainer: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const action = searchParams.get('action');
    setIsSignUp(action == 'signup');
  }, []);
  return (
    <div className="h-screen flex flex-row justify-center items-center">
      {!isSignUp ? (
        <LoginContainer isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      ) : (
        <SignUpContainer isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
};

export default AuthContainer;
