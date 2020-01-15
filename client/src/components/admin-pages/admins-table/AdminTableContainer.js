import React from 'react';

// import components
import AdminTableItem from './AdminTableItem';

export default (props) => {
  
  return (
    <tr>
      <AdminTableItem 
        id={props.id}
        firstName={props.firstName}
        lastName={props.lastName}
        emailAddress={props.emailAddress}
        actions={props.id}
        admin={props.admin}
      />
    </tr>  
  );
};

// Source AdminTable.js