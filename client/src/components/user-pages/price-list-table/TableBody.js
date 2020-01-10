import React from 'react'

// component imports
import TableItem from './TableItem';

const TableBody = (props) => {

  return (
    <TableItem 
      key={props.id}
      vehicleSize={props.vehicleSize}
      fullDetailPlus={props.fullDetailPlus}
      fullDetail={props.fullDetail}
      interiorDetail={props.interiorDetail}
      theBlitz={props.theBlitz}
      exteriorDetail={props.exteriorDetail}
      basicWash={props.basicWash}
    />
  );
}

export default TableBody;

// Source PriceListTable.js