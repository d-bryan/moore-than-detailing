import React from 'react';
import { Link } from 'react-router-dom';

// component imports
import NavUser from '../navigation/NavUser';

const Forbidden = () => {
  return (
    <>
      <NavUser />

      <div className="error--pages">
        <h1>Not Authorized</h1>
        <p>Sorry you are not authorized to be here...</p>
        <Link to="/">Click here to go Home</Link>
      </div>
    </>
  );
};

export default Forbidden;

// Source App.js