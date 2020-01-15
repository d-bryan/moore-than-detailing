import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const currentAdmin = props.admin;

  return (
    <>
    <td>{props.id}</td>
    <td>{props.firstName}</td>
    <td>{props.lastName}</td>
    <td>{props.emailAddress}</td>
    {
      (props.actions === 1 ||
      props.actions === 2) ?
      <td></td>
      :
      <td>
        <ul>
          <li><Link to={{
            pathname: `/admin/${props.actions}/delete`,
            state: {
              currentAdmin: currentAdmin || null,
              deleteAdminId: props.actions || null,
              deleteAdminFirstName: props.firstName || null,
              deleteAdminLastName: props.lastName || null,
            }
          }}><button className="admin--table--delete--button">Delete</button></Link></li>
        </ul>
      </td>
    }
    </>
  );
};

// Source AdminTableContainer.js