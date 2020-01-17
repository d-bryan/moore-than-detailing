import React from 'react';

// import components
import AdminServiceTableItem from './AdminServiceTableItem';

export default (props) => {
  return(
    <tr>
      <AdminServiceTableItem 
        currentAdmin={props.currentAdmin}
        id={props.id}
        adminId={props.adminId}
        serviceName={props.serviceName}
        price={props.price}
      />
    </tr>
  );
};

// Source AdminServicesTable.js
