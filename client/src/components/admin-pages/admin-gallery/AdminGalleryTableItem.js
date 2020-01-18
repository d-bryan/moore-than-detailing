import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const currentAdmin = props.currentAdmin;
  return(
    <>
      <td style={{fontSize: 1.5 + "rem", textAlign: "center"}}>{props.id}</td>
      <td style={{fontSize: 1.5 + "rem", textAlign: "center", textTransform: "uppercase"}}>{props.vehicleType}</td>
      <td>
        <div className={props.c_name}>
          <img
            // className={props.c_name}
            src={props.image}
            alt={props.vehicleType}
          />
        </div>
      </td>
      <td>
        {
          <ul>
            {/* <li><Link to={{
              pathname: `/admin-gallery/${props.id}/update`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                image: props.serviceName || null,
              }
            }}><button className="admin--table--update--button">Update</button></Link></li> */}
            <li><Link to={{
              pathname: `/admin-gallery/${props.id}/delete`,
              state: {
                currentAdmin: currentAdmin || null,
                adminId: props.adminId || null,
                image: props.image || null,
              }
            }}><button className="admin--table--delete--button" style={{paddingTop: 2 + "rem", paddingBottom: 2 + "rem"}}>Delete</button></Link></li>
          </ul>
        }
      </td>
    </>
  );
};

// Source AdminGalleryContainer.js