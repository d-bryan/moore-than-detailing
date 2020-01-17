import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const currentAdmin = props.currentAdmin;
  return(
    <>
      <td>{props.id}</td>
      <td>{props.customerFirstName}</td>
      <td>{props.customerLastName}</td>
      <td className="admin--review--cell">{props.customerReview}</td>
      <td>{props.customerRating}</td>
      <td>
      {
          <ul>
            <li><Link to={{
              pathname: `/admin-reviews/${props.id}/update`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                firstName: props.customerFirstName || null,
                lastName: props.customerLastName || null,
              }
            }}><button className="admin--table--update--button">Update</button></Link></li>
            <li><Link to={{
              pathname: `/admin-reviews/${props.id}/delete`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                firstName: props.customerFirstName || null,
                lastName: props.customerLastName || null,
              }
            }}><button className="admin--table--delete--button">Delete</button></Link></li>
          </ul>
        }
      </td>    
    </>
  );
};

// Source AdminReviewContainer.js
