import React from 'react'

const TableItem = (props) => {

  return (
    <tr>
      <td>{props.vehicleSize}</td>
      <td>$ {props.fullDetailPlus}</td>
      <td>$ {props.fullDetail}</td>
      <td>$ {props.interiorDetail}</td>
      <td>$ {props.theBlitz}</td>
      <td>$ {props.exteriorDetail}</td>
      <td>$ {props.basicWash}</td>
    </tr>
  );
};

export default TableItem;

// Source TableBody.js