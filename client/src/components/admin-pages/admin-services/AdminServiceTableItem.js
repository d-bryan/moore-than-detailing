import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const currentAdmin = props.currentAdmin;
  return (
    <>
      <td>{props.id}</td>
      <td>{props.serviceName}</td>
      <td>{props.price}</td>
      <td>
        {
          <ul>
            <li><Link to={{
              pathname: `/admin-services/${props.id}/update`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                service: props.serviceName || null,
                price: props.price || null,
              }
            }}><button className="admin--table--update--button">Update</button></Link></li>
            <li><Link to={{
              pathname: `/admin-services/${props.id}/delete`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                service: props.serviceName || null,
                price: props.price || null,
              }
            }}><button className="admin--table--delete--button">Delete</button></Link></li>
          </ul>
        }
      </td>
    </>
  );
};

// AdminServicesContainer.js
