import React from 'react'
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  return (
    <div className="admin--footer--container bounds">

      <div className="admin--footer--flex">
        <ul className="admin--footer">
          <li className="menu-header">Admin Pages</li>
          <li><Link to="/admin-dashboard">DASHBOARD</Link></li>
          <li><Link to="/admin-packages">PACKAGES</Link></li>
          <li><Link to="/admin-pricing">PRICING</Link></li>
          <li><Link to="/admin-reviews">REVIEWS</Link></li>
          <li><Link to="/admin-services">SERVICES</Link></li>
          <li><Link to="/admin-logout">LOGOUT</Link></li>
        </ul>
      </div>
      
      <div className="admin--footer--flex">
        <ul className="admin--footer">
          <li className="menu-header">User Pages</li>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about-us">ABOUT</Link></li>
          <li><Link to="/services">SERVICES</Link></li>
          <li><Link to="/appointments">APPOINTMENTS</Link></li>
          <li><Link to="/gallery">GALLERY</Link></li>
        </ul>
      </div>
      
    </div>    
  );
};

export default AdminFooter;