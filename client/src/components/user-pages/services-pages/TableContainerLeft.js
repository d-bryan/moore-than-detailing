import React from 'react';

// import components
import TableItem from './TableItem';

const TableContainerLeft = (props) => {
  var mapData;

  if (props.data) {
    mapData = props.data.map(d => {
      return (
        <TableItem
          key={d.id}
          service={d.serviceName}
          price={d.price}
        />
      );
    })
  };

  return (
      <>
        { mapData }
      </>
  );
  
}

export default TableContainerLeft;

// Source AdditonalServices.js
