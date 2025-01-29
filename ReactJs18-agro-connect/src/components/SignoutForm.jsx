import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignoutForm() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('userSession');
    navigate('/signin-form');
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sign-out-page">
      <h1>You have been signed out</h1>
      <p>Your session has ended.</p>
      <p>You will be redirected to the login page in 2 seconds.</p>
    </div>
  );
}

export default SignoutForm;