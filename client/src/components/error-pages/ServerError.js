import React from 'react';
import { Link } from 'react-router-dom';

// component imports
import NavUser from '../navigation/NavUser';

const ServerError = () => {
  return (
    <>
      <NavUser />

      <div className="error--pages">
        <h1>Internal Server Error</h1>
        <p>Sorry we seem to be having some trouble on our end...</p>
        <Link to="/">Click here to go Home</Link>
      </div>
    </>
  );
};

export default ServerError;

// Source App.js