import React from 'react'
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  return (
    <div className="admin--footer--container bounds">
      <ul className="admin--footer">
        <li id="menu-header">User Pages</li>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/about-us">ABOUT</Link></li>
        <li><Link to="/services">SERVICES</Link></li>
        <li><Link to="/appointments">APPOINTMENTS</Link></li>
        <li><Link to="/gallery">GALLERY</Link></li>
      </ul>
    </div>    
  );
};

export default AdminFooter;