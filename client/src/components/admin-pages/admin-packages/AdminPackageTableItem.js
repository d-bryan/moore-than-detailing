import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

export default (props) => {
  const currentAdmin = props.currentAdmin;
  
  return (
    <>
      <td>{props.id}</td>
      <td>{props.title}</td>
      <td>{props.estimatedTime}</td>
      <td><ReactMarkdown 
        source={props.description}
        escapeHtml={false}
      /></td>
      <td>
        {
          <ul>
            <li><Link to={{
              pathname: `/admin-packages/${props.id}/update`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                packageTitle: props.title || null,
              }
            }}><button className="admin--table--update--button">Update</button></Link></li>
            {/* <li><Link to={{
              pathname: `/admin-packages/${props.id}/delete`,
              state: {
                currentAdmin: currentAdmin || null,
                deleteAdminId: props.adminId || null,
                packageTitle: props.title || null,
              }
            }}><button className="admin--table--delete--button">Delete</button></Link></li> */}
          </ul>
        }
      </td>
    </>
  );
};


// Source AdminPackageContainer.js
