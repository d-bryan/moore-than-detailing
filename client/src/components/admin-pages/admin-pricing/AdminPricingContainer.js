import React from 'react';

// import components
import AdminPricingTableItem from './AdminPricingTableItem';

export default (props) => {
  return (
    <tr>
      <AdminPricingTableItem 
        currentAdmin={props.currentAdmin}
        id={props.id}
        vehicleSize={props.vehicleSize}
        fullDetailPlus={props.fullDetailPlus}
        fullDetail={props.fullDetail}
        interiorDetail={props.interiorDetail}
        theBlitz={props.theBlitz}
        exteriorDetail={props.exteriorDetail}
        basicWash={props.basicWash}
      />
    </tr>  
  );
};

// Source AdminPricingTable.js