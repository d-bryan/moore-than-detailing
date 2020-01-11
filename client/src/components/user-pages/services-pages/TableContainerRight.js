import React from 'react';

// component imports
import TableItem from './TableItem';

const TableContainerRight = (props) => {
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
};

export default TableContainerRight;

// Source AdditonalServices.js
