import React from 'react';

const TableItem = (props) => {
  console.log(props);
  console.log("hello")
  return(
    <tr>
      <td className="services--left">{props.service}</td>
      <td className="services--right">{props.price}</td>
    </tr>
  );
};

export default TableItem;