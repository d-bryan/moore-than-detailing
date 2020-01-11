import React from 'react';
import { NavLink } from 'react-router-dom';

// image imports
import Logo from '../../website-mockups-assets/logo-grey-text.png';

const NavUser = () => {
  return (
    <div className="navigation--container bounds">
      <div id="nav--image--container">
        <img id="header--logo" src={Logo} alt="Moore Than Detailing Logo" />
        <br/>
        <p id="nav--phone--number"><a href="tel://2406261777">240-626-1777</a></p>
      </div>
      <nav className="navigation">
        <ul>
          <li><NavLink to="/">HOME</NavLink></li>
          <li><NavLink to="/about-us">ABOUT US</NavLink></li>
          <li><NavLink to="/services">SERVICES</NavLink></li>
          <li><NavLink to="/appointments">APPOINTMENTS</NavLink></li>
          <li><NavLink to="/gallery">GALLERY</NavLink></li>
        </ul>
      </nav>
    </div>    
  );
};

export default NavUser;