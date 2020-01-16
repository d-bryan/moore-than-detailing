import React from 'react';

// import components
import AdminPackageTableItem from './AdminPackageTableItem';

export default (props) => {
  return (
    <tr>
      <AdminPackageTableItem 
        currentAdmin={props.currentAdmin}
        id={props.id}
        adminId={props.adminId}
        title={props.title}
        description={props.description}
        estimatedTime={props.estimatedTime}
      />
    </tr>
  );
};


// Source AdminPackagesTable.js