import React from 'react'
import { 
  NavLink
} from 'react-router-dom';

const AdminFooter = () => {
  return (
    <div className="admin--footer--container bounds">

      <div className="admin--footer--flex">
        <ul className="admin--footer">
          <li className="menu-header">Admin Pages</li>
          <li><NavLink to="/admin-dashboard">DASHBOARD</NavLink></li>
          <li><NavLink to="/admin-table">ADMIN TABLE</NavLink></li>
          <li><NavLink to="/admin-gallery">GALLERY</NavLink></li>
          <li><NavLink to="/admin-packages">PACKAGES</NavLink></li>
          <li><NavLink to="/admin-pricing">PRICING</NavLink></li>
          <li><NavLink to="/admin-reviews">REVIEWS</NavLink></li>
          <li><NavLink to="/admin-services">SERVICES</NavLink></li>
          <li><NavLink to="/admin-logout">LOGOUT</NavLink></li>
        </ul>
      </div>
      
      <div className="admin--footer--flex">
        <ul className="admin--footer">
          <li className="menu-header">User Pages</li>
          <li><NavLink to="/">HOME</NavLink></li>
          <li><NavLink to="/about-us">ABOUT</NavLink></li>
          <li><NavLink to="/services">SERVICES</NavLink></li>
          {/* <li><NavLink to="/appointments">APPOINTMENTS</NavLink></li> */}
          <li><NavLink to="/gallery">GALLERY</NavLink></li>
        </ul>
      </div>
      
    </div>    
  );
};

export default AdminFooter;