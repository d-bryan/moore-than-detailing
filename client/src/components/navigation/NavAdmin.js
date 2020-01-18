import React from 'react';
import { 
  Link,
  NavLink
} from 'react-router-dom';

const NavAdmin = (props) => {

  const authAdmin = props.context.authenticatedAdmin;

  return (
    <>
      <header className="navigation--container bounds">
        <div id="admin--name--container">
          {
            (authAdmin) ?
            <>
              <p>{`Hello, ${authAdmin.firstName}`}</p>
            </>
            :
            <>
              <Link 
                className="button" 
                to="/login" 
              >Login</Link>
            </>
          }

        </div>
        <nav className="navigation">
          <ul>
            <li><NavLink to="/admin-dashboard">DASHBOARD</NavLink></li>
            <li><NavLink to="/admin-table">ADMINS</NavLink></li>
            <li><NavLink to="/admin-gallery">GALLERY</NavLink></li>
            <li><NavLink to="/admin-packages">PACKAGES</NavLink></li>
            <li><NavLink to="/admin-pricing">PRICING</NavLink></li>
            <li><NavLink to="/admin-reviews">REVIEWS</NavLink></li>
            <li><NavLink to="/admin-services">SERVICES</NavLink></li>
            {
              (authAdmin) ?
              <>
                <li><NavLink to="/admin-logout">LOGOUT</NavLink></li>
              </>
              :
              <>
                <li><NavLink to="/admin-login">LOGIN</NavLink></li>
              </>
            }
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavAdmin;

// Source AdminDashboard.js