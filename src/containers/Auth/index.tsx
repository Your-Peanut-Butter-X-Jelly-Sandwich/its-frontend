'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import LoginContainer from './components/Login';
import SignUpContainer from './components/Register';
import { useSearchParams } from 'next/navigation';
const AuthContainer: React.FC = () => {
  const [isSignedUp, setSignedUp] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const action = searchParams.get('action');
    setSignedUp(action == 'login');
  }, []);
  return (
    <div>
      {isSignedUp ? (
        <LoginContainer isSignedUp={isSignedUp} setSignedUp={setSignedUp} />
      ) : (
        <SignUpContainer isSignedUp={isSignedUp} setSignedUp={setSignedUp} />
      )}
    </div>
  );
};

export default AuthContainer;
