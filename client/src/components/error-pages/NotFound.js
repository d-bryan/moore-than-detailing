import React from 'react';
import { Link } from 'react-router-dom';

// component imports
import NavUser from '../navigation/NavUser';

const NotFound = () => {
  return (
    <>
      <NavUser />

      <div className="error--pages">
        <h1>Page Not Found</h1>
        <p>Sorry we could not find what you are looking for...</p>
        <Link to="/">Click here to go Home</Link>
      </div>
    </>
  );
};

export default NotFound;

// Source App.js