import React from 'react';
import { Redirect } from 'react-router-dom';

// signs the admin out and redirects them to the home page
export default ({ context }) => {
  
  context.actions.signOut();
  
  return (
    <Redirect to="/" />
  );
};