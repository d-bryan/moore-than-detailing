import React from 'react';
import { Link } from 'react-router-dom';

// component imports
import NavUser from '../navigation/NavUser';

const LoginRequired = () => {
  return (
    <>
      <NavUser />

      <div className="error--pages">
        <h1>Must Login First</h1>
        <p>Sorry you must login first to access this area...</p>
        <Link to="/">Click here to go Home</Link>
      </div>
    </>
  );
};

export default LoginRequired;

// Source App.js