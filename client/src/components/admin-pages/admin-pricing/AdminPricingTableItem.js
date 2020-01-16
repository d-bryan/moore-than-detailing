import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const currentAdmin = props.currentAdmin;

  return (
    <>
      <td>{props.id}</td>
      <td>{props.vehicleSize}</td>
      <td>{props.fullDetailPlus}</td>
      <td>{props.fullDetail}</td>
      <td>{props.interiorDetail}</td>
      <td>{props.theBlitz}</td>
      <td>{props.exteriorDetail}</td>
      <td>{props.basicWash}</td>
      <td>
      {
          <ul>
            <li><Link to={{
              pathname: `/admin-pricing/${props.id}/update`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                vehicleSize: props.vehicleSize || null,
              }
            }}><button className="admin--table--update--button">Update</button></Link></li>
            <li><Link to={{
              pathname: `/admin-pricing/${props.id}/delete`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                vehicleSize: props.vehicleSize || null,
              }
            }}><button className="admin--table--delete--button">Delete</button></Link></li>
          </ul>
        }
      </td>    
    </>  
  );
};

// Source AdminPricingContainer.js