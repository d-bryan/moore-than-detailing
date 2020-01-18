import React from 'react';

// import components
import AdminGalleryTableItem from './AdminGalleryTableItem';

export default (props) => {
  return(
    <tr>
      <AdminGalleryTableItem 
        currentAdmin={props.currentAdmin}
        id={props.id}
        c_name={props.c_name}
        vehicleType={props.vehicleType}
        image={props.image}
      />
    </tr>
  );
};

// Source AdminGalleryTable.js